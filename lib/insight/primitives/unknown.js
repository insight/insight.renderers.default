
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return true;
};

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
    
            tag: T.SPAN({"class": PACK.__NS__+"unknown"},
                        "$node.value"),
            
            shortTag: T.SPAN({"class": PACK.__NS__+"unknown"},
                            "$node.value")

        });
    }
});
