
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["lang.type"]=="boolean");
}

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
                
                tag:
                    SPAN({"class": PACK.__NS__+"boolean"}, "$node|getValue"),
        
                shortTag:
                    SPAN({"class": PACK.__NS__+"boolean"}, "$node|getValue"),
        
                getValue: function(node) {
                    return node.value.toUpperCase();
                }  
            });
        }        
    }
});
