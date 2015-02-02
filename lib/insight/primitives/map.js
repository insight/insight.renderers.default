
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
                    SPAN({"class": PACK.__NS__+"map", "_nodeObject": "$node"}, SPAN("$VAR_label("),
                        FOR("pair", "$node,$CONST_Normal|mapIterator",
                            DIV({"class": "pair"},
                                TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                                SPAN({"class": "delimiter"}, "=>"),
                                SPAN({
                                        "class": "value",
                                        "onclick": "$onClick",
                                        "_nodeObject": "$pair.value.node",
                                        "_expandable": "$pair.value.expandable"
                                    },
                                    TAG("$pair.value.tag", {"node": "$pair.value.node"})
                                    ),
                                IF("$pair.more", SPAN({"class": "separator"}, ","))
                            )
                        ),
                    SPAN(")")),
        
                shortTag:
                    SPAN({"class": PACK.__NS__+"map", "_nodeObject": "$node"}, SPAN("$VAR_label("),
                        FOR("pair", "$node,$CONST_Short|mapIterator",
                            SPAN({"class": "pair"},
                                TAG("$pair.key.tag", {"node": "$pair.key.node"}),
                                SPAN({"class": "delimiter"}, "=>"),
                                SPAN({
                                        "class": "value",
                                        "onclick": "$onClick",
                                        "_nodeObject": "$pair.value.node",
                                        "_expandable": "$pair.value.expandable"
                                    },
                                    TAG("$pair.value.tag", {"node": "$pair.value.node"})
                                    ),
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
