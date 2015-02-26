
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
        if (data.__fc_tpl_id === "insight.renderers.default/columnexplore/layout") {
            return true;
        }
    }

    return false;
};

PACK.initTemplate(require, exports, module, {

    type: "layout",

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {


            function columnIdForMessage (message, depth) {
                 var data = condenseObjectDeep(message.og.getOrigin().value);
                 return (
                    data.__fc_parent_node_id || data.__fc_node_id
                ) + "-column-" + (
                    typeof depth !== "undefined" ? depth : data.depth
                );
            }


            return DOMPLATE.domplate({
        
                tag:
                    DIV({
                            "class": PACK.__NS__ + "layout",
                            "id": "$message|_getId",
                            "_templateObject": "$message|_getTemplateObject"
                        },
                        DIV({
                                "class": PACK.__NS__ + "panel"
                            },
                            TAG("$message|_getColumnTag", {
                                "node": "$message",
                                "message": "$message"
                            })
                            )
                        ),

                columnTag: DIV({
                                "class": PACK.__NS__ + "column",
                                "id": "$message|_getColumnId"
                            },
                            FOR("element", "$message|rowsIterator",
                                    DIV({
                                            "onclick": "$element.command",
                                            "class": PACK.__NS__ + "row"
                                        },
                                        TAG("$element.tag", {
                                            "node": "$element.node",
                                            "message": "$message"
                                        })
                                    )
                                )
                            ),


                _syncSize: function (message) {
                    var data = condenseObjectDeep(message.og.getOrigin().value);

                    var node = helpers.util.$(columnIdForMessage(message, data.depth));
                    node = helpers.util.getAncestorByClass(node, PACK.__NS__ + "layout");

                    var containerHeight = helpers.util.getAncestorByClass(node, "container-height");

                    var elements = helpers.util.getElementsByClass(node, PACK.__NS__ + "column");
                    var width = 0;
                    var height = containerHeight.offsetHeight - 15;
                    for (var i=0 ; i < elements.length ; i++) {
                        elements[i].style.height = height + "px";
                        width += elements[i].offsetWidth;
                    }

                    width += 10;

                    console.log("set panel width", width);

                    helpers.util.getChildByClass(node, PACK.__NS__ + "panel").style.width = width + "px";
                },

                _getTemplateObject: function (message) {
                    var self = this;

                    // TODO: Unsubscribe on destroy.
                    window.onresize = function () {
                        setTimeout(function () {
                            return self._syncSize(message);
                        }, 100);
                    }
                    setTimeout(function () {
                        return self._syncSize(message);
                    }, 250);

                    return this;
                },

                _getId: function (message) {
                    var data = condenseObjectDeep(message.og.getOrigin().value);
                    return data.__fc_node_id;
                },

                _getColumnTag: function () {
                    return this.columnTag;
                },

                _getColumnId: function (message) {
                    return columnIdForMessage(message);
                },

                renderMessage: function(message, domNode, options, helpers) {
                    var self = this;
                    var data = condenseObjectDeep(message.og.getOrigin().value);

                    if (data.action === "column") {

                        for (var i = parseInt(data.depth) ; ; i++) {
                            var existingNode = existingNode = helpers.util.$(columnIdForMessage(message, i), domNode.ownerDocument);
                            if (!existingNode) break;
                            existingNode.remove();
                        }

                        this.columnTag.append({"message": message}, helpers.util.getChildByClass(domNode, PACK.__NS__ + "panel"));

                        setTimeout(function () {
                            return self._syncSize(message);
                        }, 100);

                    } else {
                        throw new Error("Message with action '" + data.action + "' not supported!");
                    }
                },

                rowsIterator: function(message) {
                    var self = this;

                    var data = condenseObjectDeep(message.og.getOrigin().value);

                    var elements = [];

                    data.rows.forEach(function (row) {

                        var node = row[1];
                        if (node.type === "map") {
                            node = condenseObjectShallow(node.value);
                            node = node.label;
                        }

                        elements.push({
                            "id": row[0].value,
                            "tag": helpers.getTemplateForNode(node).tag,
                            "node": node,
                            "command": function (event) {

                                var column = helpers.util.getAncestorByClass(event.target, PACK.__NS__ + "column");
                                var existingSelected = helpers.util.getElementByClass(column, PACK.__NS__ + "row selected");
                                if (existingSelected) {
                                    helpers.util.removeClass(existingSelected, "selected");
                                }
                                var element = event.target;
                                if (!helpers.util.hasClass(element, PACK.__NS__ + "row")) {
                                    element = helpers.util.getAncestorByClass(element, PACK.__NS__ + "row");
                                }

                                helpers.util.setClass(element, "selected");


                                // HACK: Use wildfire or other mechanism instead.
                                if (data.clickHandler === "window._fireconsole_columnexplorer_callbacks['columnId']") {
                                    return window._fireconsole_columnexplorer_callbacks[data.columnId](row[0].value);
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
    }
});

