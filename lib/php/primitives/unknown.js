
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.type=="text" && node.meta && node.meta["lang.type"]=="unknown");
}

PACK.initTemplate(require, exports, module, {

    __name: "unknown",
    
    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
    
            tag:
                T.DIV("UNKNOWN EXPANDED"),
    
            collapsedTag:
                T.DIV("UNKNOWN COLLAPSED"),
    
            shortTag:
                T.DIV("UNKNOWN SHORT")

        });
    }
});
