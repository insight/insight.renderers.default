
var PACK = require("../pack");
var TRACE_TEMPLATE = require("../../insight/structures/trace");

exports.supportsObjectGraphNode = function(node)
{
    return (node.type=="dictionary" && node.meta && node.meta["lang.type"]=="exception");
}

PACK.initTemplate(require, exports, module, {

    __name: "exception",

    VAR_hideShortTagOnExpand: false,
    
    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
                
                inherits: TRACE_TEMPLATE,
        
                collapsedTag:
                    SPAN({"class": PACK.__NS__+"exception"}, "$node|getCaption"),
                
                getCaption: function(node) {
                    return node.meta["lang.class"] + ": " + node.value.message.value;
                },
                
                getTrace: function(node) {
                    if (node.type=="map")
                        return [].concat(node.compact().trace.value);

                    if (node.type=="dictionary")
                        return [].concat(node.value.trace.value);
                }  
            });
        }        
    }
});
