
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return false;
};

PACK.initTemplate(require, exports, module, {
    __name: "viewer",
    
    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({

            tag:
                T.DIV({
                    "class": PACK.__NS__ + "viewer-harness"
                }, T.TAG("$message|_getTag", {
                    "node": "$message|_getValue",
                    "message": "$message"
                })),

            _getTag: function(message)
            {
                return message.template.tag;
            },

            _getValue: function(message)
            {
                if (typeof message.og != "undefined")
                    return message.og.getOrigin();
                else
                if (typeof message.node != "undefined")
                {
                    return message.node;
                }
                else
                    helpers.logger.error("Unknown message format in " + module.id);
            }
        });
    }
});

exports.renderMessage = function(message, node, options, helpers)
{
    exports.getTemplate(helpers).tag.replace({"message": message}, node);
}
