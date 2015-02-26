
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

exports.renderMessage = function(message, domNode, options, helpers) {
    return exports.getTemplate(helpers).tag.replace({"message": message}, domNode);
}
