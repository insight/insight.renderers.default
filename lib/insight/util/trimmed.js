
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["encoder.trimmed"] && !node.meta["encoder.trimmed.partial"]);
};

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
    
            tag:
                T.SPAN({"class": PACK.__NS__+"util-trimmed"},
                    "$node|getNotice"
                ),

            collapsedTag: 
                T.SPAN({"class": PACK.__NS__+"util-trimmed"},
                    "$node|getNotice"
                ),

            getNotice: function(node) {
                return node.meta["encoder.notice"];
            }
        });
    }
});
