
var PACK = require("../pack");
var DICTIONARY_TEMPLATE = require("../../insight/primitives/dictionary");

exports.supportsObjectGraphNode = function(node)
{
    return (node.type=="dictionary" && node.meta && node.meta["lang.type"]=="object");
}

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({

                inherits: DICTIONARY_TEMPLATE,

                getLabel: function(node) {
                    return node.meta["lang.class"];
                },
                
                getMemberNameDecorator: function(member) {
        
                    var decorator = [];
        
                    if(member.node.meta["lang.visibility"]) {
                        decorator.push(member.node.meta["lang.visibility"]);
                    } else
                    if(member.node.meta["lang.undeclared"]) {
                        decorator.push("undeclared");
                    }
        
                    if(member.node.meta["lang.static"]) {
                        decorator.push("static");
                    }
        
                    return decorator.join("-");
                }

            });
        }        
    }
});
