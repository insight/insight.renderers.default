
var PACK = require("./pack");

function condenseObjectDeep(nodes) {
    var data = {};
    nodes.forEach(function (node) {
        data[node[0].value] = node[1].value;
    });
    return data;
}

function condenseObjectShallow(nodes) {
    var data = {};
    nodes.forEach(function (node) {
        data[node[0].value] = node[1];
    });
    return data;
}

exports.supportsObjectGraphNode = function(node)
{
    if (node.type === "map" && node.value.forEach) {
        var data = condenseObjectDeep(node.value);        
        if (data.__fc_tpl_id === "insight.renderers.default/apiexplore/request") {
            return true;
        }
    }

    return false;
};

PACK.initTemplate(require, exports, module, {

    type: "request",

    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
    
            tag:
                T.DIV({
                        "class": PACK.__NS__ + "request",
                        "id": "$message|_getId",
                        "_templateObject": "$message|_getTemplateObject"
                    },
                    T.DIV({
                            "class": PACK.__NS__ + "request-header",
                            "onclick": "$_onHeaderClick"
                        },
                        T.DIV({
                            "class": PACK.__NS__ + "request-status",
                            "id": "$message|_getId-status"
                        }),
                        T.DIV({
                            "class": PACK.__NS__ + "request-uri"
                        }, "$message|_getUri")                            
                    ),
                    T.DIV({
                            "class": PACK.__NS__ + "request-details",
                            "id": "$message|_getId-details"
                        },
                        T.DIV({
                                "class": PACK.__NS__ + "request-details-request"
                            },
                            T.TAG("$message|_getDataTag", {
                                "node": "$message|_getDataValue",
                                "message": "$message"
                            })
                        ),
                        T.DIV({
                            "class": PACK.__NS__ + "request-details-response",
                            "id": "$message|_getId-response"
                        }))
                    ),

            _getTemplateObject: function () {
                return this;
            },

            _getId: function (message) {
                var data = condenseObjectDeep(message.og.getOrigin().value);
                return data.__fc_node_id;
            },

            _getUri: function (message) {
                var data = condenseObjectDeep(message.og.getOrigin().value);
                var info = condenseObjectDeep(data.info);
                return info.uri;
            },

            _onHeaderClick: function (event) {
                var detailsNode = helpers.util.$(helpers.util.getAncestorByClass(event.target, PACK.__NS__ + "request-header").parentNode.id + "-details");
                if (helpers.util.hasClass(detailsNode, PACK.__NS__ + "request-details-hidden")) {
                    helpers.util.removeClass(detailsNode, PACK.__NS__ + "request-details-hidden");
                } else {
                    helpers.util.setClass(detailsNode, PACK.__NS__ + "request-details-hidden");
                }
            },

            _getDataTag: function(message)
            {
                var data = condenseObjectDeep(message.og.getOrigin().value);
                var info = condenseObjectShallow(data.info);
                var template = helpers.getTemplateForNode(info.data);
                return template.tag;                    
            },

            _getDataValue: function(message)
            {
                var data = condenseObjectDeep(message.og.getOrigin().value);
                var info = condenseObjectShallow(data.info);
                return info.data;
            },

            renderMessage: function(message, domNode, options, helpers) {
                var self = this;
                var data = condenseObjectDeep(message.og.getOrigin().value);
                if (data.action === "response") {

                    var statusNode = helpers.util.$(domNode.id + "-status");
                    var info = condenseObjectDeep(data.info);
                    if (info.error) {
                        statusNode.innerHTML = info.error;
                        // TODO: Add `info.error` or more rules to detect error state.
                        helpers.util.setClass(statusNode, PACK.__NS__ + "request-status-error");
                    } else {
                        statusNode.innerHTML = "OK";
                        helpers.util.setClass(statusNode, PACK.__NS__ + "request-status-success");

                        var detailsNode = helpers.util.$(domNode.id + "-details");
                        helpers.util.setClass(detailsNode, PACK.__NS__ + "request-details-hidden");
                    }

                    domNode = helpers.util.$(domNode.id + "-response");
                    return helpers.getTemplateForNode(message.og.getOrigin()).tag.append({"message": message}, domNode);
                } else {
                    throw new Error("Message with action '" + data.action + "' not supported!");
                }
            }

        });
    }

});

