
// TODO: Rename to `layout.js`.


var PACK = require("./pack");


function condenseObjectShallow(nodes) {
    var data = {};
    nodes.forEach(function (node) {
        data[node[0].value] = node[1];
    });
    return data;
}

function condenseObjectDeep(nodes) {
    var data = {};
    nodes.forEach(function (node) {
        data[node[0].value] = node[1].value;
    });
    return data;
}


exports.supportsObjectGraphNode = function(node)
{
    if (node.type === "map" && node.value.forEach) {
        var data = condenseObjectDeep(node.value);        
        if (data.__fc_tpl_id === "insight.renderers.default/apiexplore/layer") {
            return true;
        }
    }

    return false;
};

PACK.initTemplate(require, exports, module, {

    type: "layer",

    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
    
            tag:
                T.DIV({
                        "class": PACK.__NS__ + "layer",
                        "message": "$message|_getMessage",
                        "id": "$message|_getId",
                        "_templateObject": "$message|_getTemplateObject"
                    },
                    T.DIV({
                            "class": PACK.__NS__ + "layer-header"
                        },
                        T.DIV({
                            "class": PACK.__NS__ + "layer-title"
                            }, "$message|_getTitle"
                        ),
                        T.DIV({
                            "class": PACK.__NS__ + "layer-actions"
                            },
                            T.FOR("element", "$message|actionsIterator",
                                T.DIV({
                                        "class": PACK.__NS__ + "layer-action $element.class",
                                        "onclick": "$element.command",
                                        "id": "$message|_getId-action-$element.id",
                                    },
                                    "$element.label",
                                    T.IF("$element.docsUrl",
                                        A({
                                                "class": PACK.__NS__ + "layer-action-docs-link",
                                                "target": "_blank",
                                                "href": "$element.docsUrl"
                                            },
                                            "Docs"
                                        )
                                    )
                                )
                            )
                        ),
                        T.DIV({
                                "class": PACK.__NS__ + "layer-snapshot",
                                "id": "$message|_getId-snapshot",
                            },
                            T.TAG("$message|_getSnapshotTag", {
                                "node": "$message|_getSnapshotValue",
                                "message": "$message"
                            })
                        )
                    ),
                    T.DIV({
                        "class": PACK.__NS__ + "layer-sublayers"
                        }
                    ),
                    T.DIV({
                        "class": PACK.__NS__ + "layer-console"
                        }
                    )
                ),

            _getTemplateObject: function () {
                return this;
            },

            _getId: function (message) {
                var data = condenseObjectDeep(message.og.getOrigin().value);
                return data.__fc_node_id;
            },

            _getTitle: function (message) {
                var data = condenseObjectDeep(message.og.getOrigin().value);
                var meta = condenseObjectDeep(data.meta);
                return meta.label;
            },

            _getSnapshotValue: function(message) {
                var data = condenseObjectShallow(message.og.getOrigin().value);
                if (data.snapshot.type === "map") {
                    data.snapshot.value.forEach(function (node) {
                        node[1].meta["collapsed"] = true;
                    });
                }
                return data.snapshot;
            },

            _getSnapshotTag: function (message) {
                var data = condenseObjectShallow(message.og.getOrigin().value);
                var template = helpers.getTemplateForNode(data.snapshot);
                return template.tag;                    
            },

            _getMessage: function (message) {

            },

            shouldShowQueue: [],

            renderMessage: function(message, domNode, options, helpers) {
                var self = this;
                var data = condenseObjectDeep(message.og.getOrigin().value);
                if (data.action === "context") {
                    domNode = helpers.util.getChildByClass(domNode, PACK.__NS__ + "layer-sublayers");
                    return exports.getTemplate(helpers).tag.append({"message": message}, domNode);
                } else
                if (data.action === "update") {
                    domNode = helpers.util.$(data.__fc_parent_node_id + "-snapshot");
                    self._getSnapshotTag(message).replace({"node": self._getSnapshotValue(message), "message": message}, domNode);
                    self.shouldShowQueue.forEach(function (shouldShow) {
                        shouldShow(data.snapshot);
                    });
                } else
                if (data.action === "request") {
                    domNode = helpers.util.getChildByClass(domNode, PACK.__NS__ + "layer-console");
                    return helpers.getTemplateForNode(message.og.getOrigin()).tag.append({"message": message}, domNode);
                } else
                if (data.action === "destroy") {

                    domNode.parentNode.removeChild(domNode);

                } else {
                    throw new Error("Message with action '" + data.action + "' not supported!");
                }
            },

            actionsIterator: function(message) {
                var self = this;

                var data = condenseObjectDeep(message.og.getOrigin().value);

                var actions = condenseObjectDeep(data.actions);

                var elements = [];
                Object.keys(actions).forEach(function (id) {
                    var action = condenseObjectDeep(actions[id]);
                    var shouldShow = function (snapshot) {
                        var oo = true;
                        if (action.shouldShow) {
                            var funcArg = action.shouldShow.match(/^\s*function\s*\(([^\)]*)\)/);
                            if (funcArg) {
                                funcArg = funcArg[1];
                                var shouldShowDynamic = new Function (funcArg, action.shouldShow.replace(/^\s*function\s*\([^\)]*\)\s*\{\s*|\s*\}\s*$/g, ""));
                                oo = shouldShowDynamic(condenseObjectDeep(snapshot));
                            } else {
                                throw new Error("The `shouldShow` function for action '" + id + "' is not valid!");
                            }
                        }
                        if (oo) {
                            helpers.util.removeClass(helpers.util.$(data.__fc_node_id + "-action-" + id), PACK.__NS__ + "layer-action-disabled");
                        } else {
                            helpers.util.setClass(helpers.util.$(data.__fc_node_id + "-action-" + id), PACK.__NS__ + "layer-action-disabled");
                        }
                        return oo;
                    };
                    self.shouldShowQueue.push(shouldShow);

                    elements.push({
                        "id": id,
                        "label": action.label,
                        "docsUrl": action.docsUrl || null,
                        "class": (shouldShow(data.snapshot)) ? "" : PACK.__NS__+"layer-action-disabled",
                        "command": function (event) {
                            if (event.target.className.indexOf("action-docs-link") !== -1) {
                                return;
                            }
                            if (helpers.util.hasClass(helpers.util.$(data.__fc_node_id + "-action-" + id), PACK.__NS__ + "layer-action-disabled")) {
                                return;
                            }
                            // HACK: Use wildfire or other mechanism instead.
                            if (action.command === "window._fireconsole_apiexplorer_callbacks['contextId']['actionId']") {
                                return window._fireconsole_apiexplorer_callbacks[data.contextId][id]();
                            } else {
                                throw new Error("Signal event!");
                            }
                        }
                    });
                });
                return elements;
            }

        });
    }
});

