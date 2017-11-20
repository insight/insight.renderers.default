
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "array",

    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;

        return DOMPLATE.domplate({

            VAR_label: "array",

            CONST_Normal: "tag",
            CONST_Short: "shortTag",
            CONST_Collapsed: "collapsedTag",
    
            tag:
                T.SPAN({"class": PACK.__NS__+"array"}, T.SPAN("$VAR_label("),
                    T.FOR("element", "$node,$CONST_Normal|elementIterator",
                        T.DIV({"class": "element", "$expandable":"$element.expandable", "_elementObject": "$element", "onclick": "$onClick"},
                            T.SPAN({"class": "value"},
                                T.TAG("$element.tag", {"element": "$element", "node": "$element.node"})
                            ),
                            T.IF("$element.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            collapsedTag:
                T.SPAN({"class": PACK.__NS__+"array"}, T.SPAN("$VAR_label("),
                    T.SPAN({"class": "collapsed"}, "... $node|getElementCount ..."),
                T.SPAN(")")),
    
            shortTag:
                T.SPAN({"class": PACK.__NS__+"array"}, T.SPAN("$VAR_label("),
                    T.FOR("element", "$node,$CONST_Short|elementIterator",
                        T.SPAN({"class": "element"},
                            T.SPAN({"class": "value"},
                                T.TAG("$element.tag", {"element": "$element", "node": "$element.node"})
                            ),
                            T.IF("$element.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            expandableStub:
                T.TAG("$element,$CONST_Collapsed|getTag", {"node": "$element.node"}),
                
            expandedStub:
                T.TAG("$tag", {"node": "$node", "element": "$element"}),
    
            moreTag:
                T.SPAN(" ... "),
    
            getElementCount: function(node) {
                if(!node.value) return 0;
                return node.value.length || 0;
            },
    
            getTag: function(element, type) {
                if(type===this.CONST_Short) {
                    return helpers.getTemplateForNode(element.node).shortTag;
                } else
                if(type===this.CONST_Normal) {
                    if(element.expandable) {
                        return this.expandableStub;
                    } else {
                        return helpers.getTemplateForNode(element.node).tag;
                    }
                } else
                if(type===this.CONST_Collapsed) {
                    var rep = helpers.getTemplateForNode(element.node);
                    if(!rep.collapsedTag) {
                        throw "no 'collapsedTag' property in rep: " + rep.toString();
                    }
                    return rep.collapsedTag;
                }
            },
    
            elementIterator: function(node, type) {
                var elements = [];
                if(!node.value) return elements;
                for( var i=0 ; i<node.value.length ; i++ ) {
                    
                    var element = {
                        "node": helpers.util.merge(node.value[i], {"wrapped": true}),
                        "more": (i<node.value.length-1),
                        "expandable": this.isExpandable(node.value[i])
                    };
    
                    if(i>2 && type==this.CONST_Short) {
                        element["tag"] = this.moreTag;
                    } else {
                        element["tag"] = this.getTag(element, type);
                    }
    
                    elements.push(element);
    
                    if(i>2 && type==this.CONST_Short) {
                        elements[elements.length-1].more = false;
                        break;
                    }
                }
                return elements;
            },
    
            isExpandable: function(node) {
                return (node.type=="reference" ||
                        node.type=="dictionary" ||
                        node.type=="map" ||
                        node.type=="array");
            },
            
            onClick: function(event) {
                if (!helpers.util.isLeftClick(event)) {
                    return;
                }
                var row = helpers.util.getAncestorByClass(event.target, "element");
                if(helpers.util.hasClass(row, "expandable")) {
                    this.toggleRow(row);
                }
                event.stopPropagation();
            },
            
            toggleRow: function(row)
            {
                var valueElement = helpers.util.getElementByClass(row, "value");
                if (helpers.util.hasClass(row, "expanded"))
                {
                    helpers.util.removeClass(row, "expanded");
                    this.expandedStub.replace({
                        "tag": this.expandableStub,
                        "element": row.elementObject,
                        "node": row.elementObject.node
                    }, valueElement);
                } else {
                    helpers.util.setClass(row, "expanded");
                    this.expandedStub.replace({
                        "tag": helpers.getTemplateForNode(row.elementObject.node).tag,
                        "element": row.elementObject,
                        "node": row.elementObject.node
                    }, valueElement);
                }
            }        
        });
    }
});
