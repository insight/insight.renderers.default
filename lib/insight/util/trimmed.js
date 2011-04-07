
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["encoder.trimmed"] && !node.meta["encoder.trimmed.partial"]);
};

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                tag:
                    SPAN({"class": PACK.__NS__+"util-trimmed"},
                        "$node|getNotice"
                    ),

                collapsedTag: 
                    SPAN({"class": PACK.__NS__+"util-trimmed"},
                        "$node|getNotice"
                    ),

                getNotice: function(node) {
                    return node.meta["encoder.notice"];
                }
            });
        }        
    }
});
