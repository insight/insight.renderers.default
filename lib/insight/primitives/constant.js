
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "constant",

    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({

            tag: T.SPAN({"class": PACK.__NS__+"constant"},
                        "$node.value"),

            shortTag: T.SPAN({"class": PACK.__NS__+"constant"},
                            "$node.value")
        });
    }
});
