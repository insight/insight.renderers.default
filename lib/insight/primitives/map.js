
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "map",

    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
            
            VAR_label: "map",
    
            CONST_Normal: "tag",
            CONST_Short: "shortTag",
    
            tag:
                T.SPAN({"class": PACK.__NS__+"map", "_nodeObject": "$node"}, T.SPAN("$VAR_label("),
                    T.FOR("pair", "$node,$CONST_Normal|mapIterator",
                        T.DIV({"class": "pair"},
                            T.TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                            T.SPAN({"class": "delimiter"}, "=>"),
                            T.SPAN({
                                    "class": "value",
                                    "onclick": "$onClick",
                                    "_nodeObject": "$pair.value.node",
                                    "_expandable": "$pair.value.expandable"
                                },
                                T.TAG("$pair.value.tag", {"node": "$pair.value.node"})
                                ),
                            T.IF("$pair.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            shortTag:
                T.SPAN({"class": PACK.__NS__+"map", "_nodeObject": "$node"}, T.SPAN("$VAR_label("),
                    T.FOR("pair", "$node,$CONST_Short|mapIterator",
                        T.SPAN({"class": "pair"},
                            T.TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                            T.SPAN({"class": "delimiter"}, "=>"),
                            T.SPAN({
                                    "class": "value",
                                    "onclick": "$onClick",
                                    "_nodeObject": "$pair.value.node",
                                    "_expandable": "$pair.value.expandable"
                                },
                                T.TAG("$pair.value.tag", {"node": "$pair.value.node"})
                                ),
                            T.IF("$pair.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            collapsedTag: 
                T.SPAN({"class": PACK.__NS__+"map"}, T.SPAN("$VAR_label("),
                    T.SPAN({"class": "collapsed"}, "... $node|getItemCount ..."),
                T.SPAN(")")),
    
            moreTag:
                T.SPAN(" ... "),   
            
            getItemCount: function(node) {
                if(!node.value) return 0;
                return node.value.length;
            },

            onClick: function(event) {
                var row = helpers.util.getAncestorByClass(event.target, "value");
                if(row.expandable) {
                    this.toggleRow(row);
                }
                event.stopPropagation();
            },
            
            toggleRow: function(row)
            {
                var node = null;
                if (helpers.util.hasClass(row, "expanded")) {
                    node = this.collapsedTag.replace({
                        "node": row.nodeObject
                    }, row);
                    helpers.util.removeClass(row, "expanded");
                } else {
                    var valueRep = helpers.getTemplateForNode(row.nodeObject).tag;
                    node = valueRep.replace({
                        "node": row.nodeObject
                    }, row);
                    helpers.util.setClass(row, "expanded");
                }
            },
    
            mapIterator: function(node, type) {
                var pairs = [];
                if(!node.value) return pairs;
                for( var i=0 ; i<node.value.length ; i++ ) {

                    var valueRep = getTag(helpers.getTemplateForNode(node.value[i][1]), type, node.value[i][1]);
    
                    if(i>2 && type==this.CONST_Short) {
                        valueRep = this.moreTag;
                    }

                    pairs.push({
                        "key": {
                            "tag": getTag(helpers.getTemplateForNode(node.value[i][0]), type, node.value[i][0]),
                            "node": helpers.util.merge(node.value[i][0], {"wrapped": true})
                        },
                        "value": {
                            "tag": valueRep,
                            "node": helpers.util.merge(node.value[i][1], {"wrapped": true}),
                            "expandable": isCollapsible(node.value[i][1])
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
});

function isCollapsible (node) {
    return (node.type=="reference" ||
            node.type=="dictionary" ||
            node.type=="map" ||
            node.type=="array");
}    

function getTag (rep, type, node) {
    if (node.meta.collapsed) {
        if (isCollapsible(node)) {
            type = "collapsedTag";
        } else {
            type = "shortTag";
        }
    }
    if(!rep[type]) {
        if(type=="shortTag") {
            return rep.tag;
        }
        throw new Error("Rep does not have tag of type: " + type);
    }
    return rep[type];
}
