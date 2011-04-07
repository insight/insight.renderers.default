
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "map",

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
                
                VAR_label: "map",
        
                CONST_Normal: "tag",
                CONST_Short: "shortTag",
        
                tag:
                    SPAN({"class": PACK.__NS__+"map"}, SPAN("$VAR_label("),
                        FOR("pair", "$node,$CONST_Normal|mapIterator",
                            DIV({"class": "pair"},
                                TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                                SPAN({"class": "delimiter"}, "=>"),
                                TAG("$pair.value.tag", {"node": "$pair.value.node"}),
                                IF("$pair.more", SPAN({"class": "separator"}, ","))
                            )
                        ),
                    SPAN(")")),
        
                shortTag:
                    SPAN({"class": PACK.__NS__+"map"}, SPAN("$VAR_label("),
                        FOR("pair", "$node,$CONST_Short|mapIterator",
                            SPAN({"class": "pair"},
                                TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                                SPAN({"class": "delimiter"}, "=>"),
                                TAG("$pair.value.tag", {"node": "$pair.value.node"}),
                                IF("$pair.more", SPAN({"class": "separator"}, ","))
                            )
                        ),
                    SPAN(")")),
        
                collapsedTag: 
                    SPAN({"class": PACK.__NS__+"map"}, SPAN("$VAR_label("),
                        SPAN({"class": "collapsed"}, "... $node|getItemCount ..."),
                    SPAN(")")),
        
                moreTag:
                    SPAN(" ... "),
        
                getItemCount: function(node) {
                    if(!node.value) return 0;
                    return node.value.length;
                },
        
                mapIterator: function(node, type) {
                    var pairs = [];
                    if(!node.value) return pairs;
                    for( var i=0 ; i<node.value.length ; i++ ) {
        
                        var valueRep = getTag(helpers.getTemplateForNode(node.value[i][1]), type);
        
                        if(i>2 && type==this.CONST_Short) {
                            valueRep = this.moreTag;
                        }
        
                        pairs.push({
                            "key": {
                                "tag": getTag(helpers.getTemplateForNode(node.value[i][0]), type),
                                "node": helpers.util.merge(node.value[i][0], {"wrapped": true})
                            },
                            "value": {
                                "tag": valueRep,
                                "node": helpers.util.merge(node.value[i][1], {"wrapped": true})
                            },
                            "more": (i<node.value.length-1)
                        });
        
                        if(i>2 && type==this.CONST_Short) {
                            pairs[pairs.length-1].more = false;
                            break;
                        }
                    }
                    return pairs;
                }
            });
        }        
    }
});

function getTag(rep, type) {
    if(!rep[type]) {
        if(type=="shortTag") {
            return rep.tag;
        }
        throw new Error("Rep does not have tag of type: " + type);
    }
    return rep[type];
}
