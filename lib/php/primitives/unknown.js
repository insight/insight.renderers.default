
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.type=="text" && node.meta && node.meta["lang.type"]=="unknown");
}

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                tag:
                    DIV("UNKNOWN EXPANDED"),
        
                collapsedTag:
                    DIV("UNKNOWN COLLAPSED"),
        
                shortTag:
                    DIV("UNKNOWN SHORT")

            });
        }        
    }
});
