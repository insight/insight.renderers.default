
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["lang.type"]=="null");
}

PACK.initTemplate(require, exports, module, {

    __name: "null",
    
    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                tag:
                    SPAN({"class": PACK.__NS__+"null"}, "$node|getValue"),

                shortTag:
                    SPAN({"class": PACK.__NS__+"null"}, "$node|getValue"),

                getValue: function(node) {
                    return node.value.toUpperCase();
                }

            });
        }        
    }
});
