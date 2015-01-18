
var DOMPLATE = require("domplate/lib/domplate");

var rep;

function initRep()
{
    with(DOMPLATE.tags)
    {
        rep = DOMPLATE.domplate({

            tag: SPAN({"class": "__" + module.hashId + "__"}, "$node|getData"),

            shortTag: SPAN({"class": "__" + module.hashId + "__"}, "$node|getData"),
            
            getData: function(node)
            {
                return node.value;
            }
        });
    }
}

function ensureRep(helpers)
{
    if (typeof rep == "undefined")
    {
        initRep();
        helpers.importCssString(require("text!./data-string.css").replace(/__NS__/g, "__" + module.hashId + "__"));
    }
}

exports.renderObjectGraphToNode = function(ogNode, domNode, options, helpers)
{
    ensureRep(helpers);
    rep.tag.replace({"node": ogNode}, domNode); 
}

exports.getTemplate = function(helpers)
{
    ensureRep(helpers);
    return rep;
}
