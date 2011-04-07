
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return true;
};

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                tag: SPAN({"class": PACK.__NS__+"unknown"},
                          "$node.value"),
                
                shortTag: SPAN({"class": PACK.__NS__+"unknown"},
                               "$node.value")

            });
        }        
    }
});
