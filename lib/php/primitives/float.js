
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["lang.type"]=="float");
}

PACK.initTemplate(require, exports, module, {

    __name: "float",
    
    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
    
            tag:
                T.SPAN({"class": PACK.__NS__+"float"}, "$node|getValue"),
    
            shortTag:
                T.SPAN({"class": PACK.__NS__+"float"}, "$node|getValue"),
    
            getValue: function(node) {
                return addCommas(node.value);
            }    

        });
    }
});

// @see http://www.mredkj.com/javascript/numberFormat.html
function addCommas(nStr)
{
    nStr += '';
    x = nStr.split('.');
    x1 = x[0];
    x2 = x.length > 1 ? '.' + x[1] : '';
    var rgx = /(\d+)(\d{3})/;
    while (rgx.test(x1)) {
        x1 = x1.replace(rgx, '$1' + ',' + '$2');
    }
    return x1 + x2;
}
