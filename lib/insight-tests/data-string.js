
var DOMPLATE = require("domplate/lib/domplate");

var rep;

function initRep()
{
    var T = DOMPLATE.tags;
    
    rep = DOMPLATE.domplate({

        tag: T.SPAN({"class": "__" + module.hashId + "__"}, "$node|getData"),

        shortTag: T.SPAN({"class": "__" + module.hashId + "__"}, "$node|getData"),
        
        getData: function(node)
        {
            return node.value;
        }
    });
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
