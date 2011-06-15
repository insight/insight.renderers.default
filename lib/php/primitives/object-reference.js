
var PACK = require("../pack");
var REFERENCE_TEMPLATE = require("../../insight/primitives/reference");

exports.supportsObjectGraphNode = function(node)
{
    return (node.type=="reference");
}

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({

                inherits: REFERENCE_TEMPLATE
        
            });
        }        
    }
});
