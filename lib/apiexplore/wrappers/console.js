
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return false;
};

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                tag:
                    TAG("$message|_getTag", {
                        "node": "$message|_getValue",
                        "message": "$message",
                        "_templateObject": "$message|_getTemplateObject"
                    }),

                _getTemplateObject: function() {
                    return this;
                },

                _getTag: function(message)
                {
                    var rep = message.template;
                    return rep.tag;
                },

                _getValue: function(message)
                {
                    return message.og.getOrigin();
                }
            });
        }        
    }
});

function condenseObjectDeep(nodes) {
    var data = {};
    nodes.forEach(function (node) {
        data[node[0].value] = node[1].value;
    });
    return data;
}

exports.renderMessage = function(message, domNode, options, helpers) {
    var data = condenseObjectDeep(message.og.getOrigin().value);

    if (data.__fc_parent_node_id) {
//        console.log("log into parent node", data.__fc_parent_node_id);
        domNode = helpers.util.$(data.__fc_parent_node_id);
        if (!domNode) {
            throw new Error("Dom node with id '" + data.__fc_parent_node_id + "' not found!");
        }
        if (!domNode.templateObject) {
            throw new Error("Template used to render node at it '" + data.__fc_parent_node_id + "' does not have a 'templateObject' property!");
        }
        return domNode.templateObject.renderMessage(message, domNode, options, helpers);
    }

    var node = exports.getTemplate(helpers).tag.replace({"message": message}, domNode);

//console.log("LOGGED NODE", node);  
//console.log("domNode", domNode);
//console.log("domNode.children[0]", domNode.children[0]);  
//console.log("domNode.children[0].templateObject", domNode.children[0].templateObject);  

//domNode.children[0].templateObject.postRender(domNode.children[0]);

}
