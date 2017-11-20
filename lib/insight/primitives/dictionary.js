
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "dictionary",

    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({
    
            CONST_Normal: "tag",
            CONST_Short: "shortTag",
            CONST_Collapsed: "collapsedTag",
    
            tag:
                T.SPAN({"class": PACK.__NS__+"dictionary"}, T.SPAN("$node|getLabel("),
                    T.FOR("member", "$node,$CONST_Normal|dictionaryIterator",
                        T.DIV({"class": "member", "$expandable":"$member.expandable", "_memberObject": "$member", "onclick": "$onClick"},
                            T.SPAN({"class": "name", "decorator": "$member|getMemberNameDecorator"}, "$member.name"),
                            T.SPAN({"class": "delimiter"}, ":"),
                            T.SPAN({"class": "value"},
                                T.TAG("$member.tag", {"member": "$member", "node": "$member.node"})
                            ),
                            T.IF("$member.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            shortTag:
                T.SPAN({"class": PACK.__NS__+"dictionary"}, T.SPAN("$node|getLabel("),
                    T.FOR("member", "$node,$CONST_Short|dictionaryIterator",
                        T.SPAN({"class": "member"},
                            T.SPAN({"class": "name"}, "$member.name"),
                            T.SPAN({"class": "delimiter"}, ":"),
                            T.SPAN({"class": "value"},
                                T.TAG("$member.tag", {"member": "$member", "node": "$member.node"})
                            ),
                            T.IF("$member.more", T.SPAN({"class": "separator"}, ","))
                        )
                    ),
                T.SPAN(")")),
    
            collapsedTag:
                T.SPAN({"class": PACK.__NS__+"dictionary"}, T.SPAN("$node|getLabel("),
                    T.SPAN({"class": "collapsed"}, "... $node|getMemberCount ..."),
                T.SPAN(")")),
    
            expandableStub:
                T.TAG("$member,$CONST_Collapsed|getTag", {"node": "$member.node"}),
                
            expandedStub:
                T.TAG("$tag", {"node": "$node", "member": "$member"}),
    
            moreTag:
                T.SPAN({"class": "more"}, " ... "),
            
            getLabel: function(node) {
                return "dictionary";
            },
            
            getMemberNameDecorator: function(member) {
                return "";
            },
            
            getMemberCount: function(node) {
                if(!node.value) return 0;
                var count = 0;
                for( var name in node.value ) {
                    count++;
                }
                return count;
            },
            
            getTag: function(member, type) {
                if(type===this.CONST_Short) {
                    return helpers.getTemplateForNode(member.node).shortTag;
                } else
                if(type===this.CONST_Normal) {
                    if(member.expandable) {
                        return this.expandableStub;
                    } else {
                        return helpers.getTemplateForNode(member.node).tag;
                    }
                } else
                if(type===this.CONST_Collapsed) {
                    var rep = helpers.getTemplateForNode(member.node);
                    if(!rep.collapsedTag) {
                        throw "no 'collapsedTag' property in rep: " + rep.toString();
                    }
                    return rep.collapsedTag;
                }
            },
            
            dictionaryIterator: function(node, type) {
                var members = [];
                if(!node.value || node.value.length==0) return members;
                for( var name in node.value ) {
    
                    var member = {
                        "name": name,
                        "node": helpers.util.merge(node.value[name], {"wrapped": true}),
                        "more": true,
                        "expandable": this.isExpandable(node.value[name])
                    };
    
                    if(members.length>1 && type==this.CONST_Short) {
                        member["tag"] = this.moreTag;
                    } else {
                        member["tag"] = this.getTag(member, type);
                    }
                    
                    members.push(member);
    
                    if(members.length>2 && type==this.CONST_Short) {
                        break;
                    }
                }
                if(members.length>0) {
                    members[members.length-1]["more"] = false;
                }
                
                return members;
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
                var row = helpers.util.getAncestorByClass(event.target, "member");
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
                        "member": row.memberObject,
                        "node": row.memberObject.node
                    }, valueElement);
                } else {
                    helpers.util.setClass(row, "expanded");
                    this.expandedStub.replace({
                        "tag": helpers.getTemplateForNode(row.memberObject.node).tag,
                        "member": row.memberObject,
                        "node": row.memberObject.node
                    }, valueElement);
                }
            }
        });
    }
});
