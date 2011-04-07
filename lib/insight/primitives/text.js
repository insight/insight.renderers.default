
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "text",

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                tag: SPAN({"class": PACK.__NS__+"text"},
                          FOR("line", "$node.value|lineIterator", "$line.value",
                              IF("$line.more", BR())
                          )
                     ),
                
                shortTag: SPAN({"class": PACK.__NS__+"text"}, "$node.value|cropString"),
        
        
                cropString: function(text, limit){
                    text = text + "";
                    limit = limit || 50;
                    var halfLimit = limit / 2;
                    if (text.length > limit) {
                        return this.escapeNewLines(text.substr(0, halfLimit) + "..." + text.substr(text.length - halfLimit));
                    } else {
                        return this.escapeNewLines(text);
                    }
                },
                
                escapeNewLines: function(value) {
                    return value.replace(/\r/g, "\\r").replace(/\n/g, "\\n");
                },
                
                lineIterator: function(value) {
                    var parts = (""+value).replace(/\r/g, "\\r").split("\n");
                    var lines = [];
                    for( var i=0 ; i<parts.length ; i++ ) {
                        lines.push({"value": parts[i], "more": (i<parts.length-1)});
                    }
                    return lines;
                }
            });
        }        
    }
});
