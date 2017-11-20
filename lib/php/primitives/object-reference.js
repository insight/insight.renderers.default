
var PACK = require("../pack");
var REFERENCE_TEMPLATE = require("../../insight/primitives/reference");

exports.supportsObjectGraphNode = function(node)
{
    return (node.type=="reference");
}

PACK.initTemplate(require, exports, module, {

    __name: "object-reference",
    
    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({

            inherits: REFERENCE_TEMPLATE
    
        });
    }
});
