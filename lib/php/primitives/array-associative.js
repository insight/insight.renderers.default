
var PACK = require("../pack");
var MAP_TEMPLATE = require("../../insight/primitives/map");

exports.supportsObjectGraphNode = function(node)
{
    return (node.type=="map" && node.meta && node.meta["lang.type"]=="array");
}

PACK.initTemplate(require, exports, module, {

    __name: "array-associative",
    
    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
            
            inherits: MAP_TEMPLATE,
    
            VAR_label: "array"
        });
    }
});
