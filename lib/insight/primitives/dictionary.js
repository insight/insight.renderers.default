
var PACK = require("../pack");

PACK.initTemplate(require, exports, module, {

    type: "dictionary",

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                CONST_Normal: "tag",
                CONST_Short: "shortTag",
                CONST_Collapsed: "collapsedTag",
        
                tag:
                    SPAN({"class": PACK.__NS__+"dictionary"}, SPAN("$node|getLabel("),
                        FOR("member", "$node,$CONST_Normal|dictionaryIterator",
                            DIV({"class": "member", "$expandable":"$member.expandable", "_memberObject": "$member", "onclick": "$onClick"},
                                SPAN({"class": "name", "decorator": "$member|getMemberNameDecorator"}, "$member.name"),
                                SPAN({"class": "delimiter"}, ":"),
                                SPAN({"class": "value"},
                                    TAG("$member.tag", {"member": "$member", "node": "$member.node"})
                                ),
                                IF("$member.more", SPAN({"class": "separator"}, ","))
                            )
                        ),
                    SPAN(")")),
        
                shortTag:
                    SPAN({"class": PACK.__NS__+"dictionary"}, SPAN("$node|getLabel("),
                        FOR("member", "$node,$CONST_Short|dictionaryIterator",
                            SPAN({"class": "member"},
                                SPAN({"class": "name"}, "$member.name"),
                                SPAN({"class": "delimiter"}, ":"),
                                SPAN({"class": "value"},
                                    TAG("$member.tag", {"member": "$member", "node": "$member.node"})
                                ),
                                IF("$member.more", SPAN({"class": "separator"}, ","))
                            )
                        ),
                    SPAN(")")),
        
                collapsedTag:
                    SPAN({"class": PACK.__NS__+"dictionary"}, SPAN("$node|getLabel("),
                        SPAN({"class": "collapsed"}, "... $node|getMemberCount ..."),
                    SPAN(")")),
        
                expandableStub:
                    TAG("$member,$CONST_Collapsed|getTag", {"node": "$member.node"}),
                    
                expandedStub:
                    TAG("$tag", {"node": "$node", "member": "$member"}),
        
                moreTag:
                    SPAN({"class": "more"}, " ... "),
                
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
    }
});
