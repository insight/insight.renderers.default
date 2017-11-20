
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["lang.type"]=="boolean");
}

PACK.initTemplate(require, exports, module, {

    __name: "boolean",
    
    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
            
            tag:
                T.SPAN({"class": PACK.__NS__+"boolean"}, "$node|getValue"),
    
            shortTag:
                T.SPAN({"class": PACK.__NS__+"boolean"}, "$node|getValue"),
    
            getValue: function(node) {
                return node.value.toUpperCase();
            }  
        });
    }
});
