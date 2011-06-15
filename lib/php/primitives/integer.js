
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && node.meta["lang.type"]=="integer");
}

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                tag:
                    SPAN({"class": PACK.__NS__+"integer"}, "$node|getValue"),
        
                shortTag:
                    SPAN({"class": PACK.__NS__+"integer"}, "$node|getValue"),
        
                getValue: function(node) {
                    return addCommas(node.value);
                }    

            });
        }        
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
