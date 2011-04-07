
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "constant",

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({

                tag: SPAN({"class": PACK.__NS__+"constant"},
                          "$node.value"),

                shortTag: SPAN({"class": PACK.__NS__+"constant"},
                               "$node.value")
            });
        }        
    }
});
