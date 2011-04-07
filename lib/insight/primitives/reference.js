
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "reference",

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                CONST_Normal: "tag",
                CONST_Short: "shortTag",
                CONST_Collapsed: "collapsedTag",
        
                tag:
                    SPAN({"class": PACK.__NS__+"reference"},
                    TAG("$node,$CONST_Normal|getTag", {"node": "$node|getInstanceNode"})),
                
                shortTag:
                    SPAN({"class": PACK.__NS__+"reference"},
                    TAG("$node,$CONST_Collapsed|getTag", {"node": "$node|getInstanceNode"})),
        
                collapsedTag:
                    SPAN({"class": PACK.__NS__+"reference"},
                    TAG("$node,$CONST_Collapsed|getTag", {"node": "$node|getInstanceNode"})),
                    
                getTag: function(node, type) {
                    return helpers.getTemplateForNode(this.getInstanceNode(node))[type];
                },
                
                getInstanceNode: function(node) {
                    return node.getInstance();
                }
            });
        }        
    }
});
