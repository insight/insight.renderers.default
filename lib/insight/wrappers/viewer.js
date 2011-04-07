
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
                    DIV({
                        "class": PACK.__NS__ + "viewer-harness"
                    }, TAG("$message|_getTag", {
                        "node": "$message|_getValue",
                        "message": "$message"
                    })),

                _getTag: function(message)
                {
                    return message.template.tag;
                },

                _getValue: function(message)
                {
                    return message.og.getOrigin();
                }
            });
        }        
    }
});

exports.renderMessage = function(message, node, options, helpers)
{
    exports.getTemplate(helpers).tag.replace({"message": message}, node);
}
