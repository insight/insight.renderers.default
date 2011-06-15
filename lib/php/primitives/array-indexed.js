
var PACK = require("../pack");
var ARRAY_TEMPLATE = require("../../insight/primitives/array");

exports.supportsObjectGraphNode = function(node)
{
    return (node.type=="array" && node.meta && node.meta["lang.type"]=="array");
}

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
                
                inherits: ARRAY_TEMPLATE,
        
                VAR_label: "array"
            });
        }        
    }
});