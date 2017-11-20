
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["lang.type"]=="resource");
}

PACK.initTemplate(require, exports, module, {

    __name: "resource",
    
    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({

            tag:
                T.SPAN({"class": PACK.__NS__+"resource"}, "[$node|getValue]"),
    
            shortTag:
                T.SPAN({"class": PACK.__NS__+"resource"}, "[$node|getValue]"),
    
            getValue: function(node) {
                return node.value.toUpperCase();
            }    
    
        });
    }
});
