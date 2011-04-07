
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return false;
};

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({

                CONST_Normal: "tag",
                CONST_Short: "shortTag",
        
                tag:
                    DIV({
                        "class": "$message|_getMessageClass",
                        "_messageObject": "$message",
                        "onmouseover":"$onMouseOver",
                        "onmousemove":"$onMouseMove",
                        "onmouseout":"$onMouseOut",
                        "onclick":"$onClick",
                        "expandable": "$message|_isExpandable",
                        "expanded": "false",
                        "_templateObject": "$message|_getTemplateObject"
                    },
                    DIV({"class": "$message|_getTitleClass", "hideOnExpand": "$message|_getHideShortTagOnExpand"},
                        DIV({"class": "expander"}),
                        SPAN(    // WORKAROUND: IF does not work at top level due to a bug
                            IF("$message|_hasLabel", DIV({"class": "label"}, "$message|_getLabel"))
                        ),
                        DIV({"class": "value"},
                            TAG("$message,$CONST_Short|_getTag", {
                                "node": "$message|_getValue",
                                "message": "$message"
                            })
                        ),
                        DIV({"class": "actions"},
                            DIV({"class": "inspect", "onclick":"$onClick"}),
                            DIV({"class": "file $message|_getFileActionClass", "onclick":"$onClick"})
                        ),
                        DIV({"class": "fileline"}, DIV("$message|_getTitleFileLine"))
                     ), DIV({"class": "$message|_getBodyClass"}
                     )),
                 
                 groupNoMessagesTag:
                    DIV({"class": "group-no-messages"}, "No Messages"),    
                 
                 
                _getTemplateObject: function() {
                    return this;
                },
        
                _getMessageClass: function(message) {
                    if(typeof message.meta["group.start"] != "undefined") {
                        return PACK.__NS__ + "console-message " + PACK.__NS__ + "console-message-group";
                    } else {
                        return PACK.__NS__ + "console-message";
                    }
                },
        
                _getTitleClass: function(message) {
                    if(!message.meta || !message.meta["priority"]) {
                        return "title";
                    }
                    return "title title-priority-" + message.meta["priority"];
                },
        
                _getBodyClass: function(message) {
                    if(!message.meta || !message.meta["priority"]) {
                        return "body";
                    }
                    return "body body-priority-" + message.meta["priority"];
                },
                
                _getTitleFileLine: function(message) {
                    if(!message.meta) {
                        return "";
                    }
                    var str = [];
                    if(typeof message.meta["file"] != "undefined") {
                        str.push(helpers.util.cropStringLeft(message.meta["file"], 75));
                    }
                    if(typeof message.meta["line"] != "undefined") {
                        str.push("@");
                        str.push(message.meta["line"]);
                    }
                    return str.join(" ");
                },
        
                // TODO: Need better way to set/determine if tag should be hidden
                _getHideShortTagOnExpand: function(message) {
                    if(typeof message.meta["group.start"] != "undefined") {
                        return "false";
                    }
                    var rep = this._getRep(message);
                    if(rep.VAR_hideShortTagOnExpand===false) {
                        return "false";
                        
                    }
                    var node = message.og.getOrigin();
                    if(node.type=="reference") {
                        node = node.getInstance();
                        if(node.meta["lang.type"]=="exception") {
                            return "false";
                        }
                    }
                    return "true";
                },
        
                _isExpandable: function(message) {
        /*
                    switch(message.getObjectGraph().getOrigin().type) {
                        case "array":
                        case "reference":
                        case "dictionary":
                        case "map":
                        case "text":
                            break;
                    }
        */            
                    return true;
                },
                
                _getFileActionClass: function(message) {
                    if(message.meta["file"]) return "";
                    return "hidden";
                },
        
                _getTag: function(message, type)
                {
                    var rep = this._getRep(message);
                    if(type==this.CONST_Short) {
                        if(rep.shortTag) {
                            return rep.shortTag;
                        }
                    }
                    return rep.tag;
                },
                
                _getRep: function(message)
                {
                    return message.template;
/*
                    var rep;
                    
                    if(message.meta && message.meta["renderer"]) {
                        rep = helpers.getTemplateForId(message.meta["renderer"]);
                    } else {
                        rep = helpers.getTemplateForNode(message.getObjectGraph().getOrigin());
                    }
                    return rep;
*/
                },
        
                _hasLabel: function(message)
                {
                    if(message.meta && typeof message.meta["label"] != "undefined") {
                        return true;
                    } else {
                        return false;
                    }
                },
        
                _getLabel: function(message)
                {
                    if(this._hasLabel(message)) {
                        return message.meta["label"];
                    } else {
                        return "";
                    }
                },
        
                _getValue: function(message)
                {
                    return message.og.getOrigin();
                },
        
                onMouseMove: function(event)
                {
        /*            
                    if(activeInfoTip) {
                        var x = event.clientX, y = event.clientY;
                        infoTipModule.showInfoTip(activeInfoTip, {
                            showInfoTip: function() {
                                return true;
                            }
                        }, event.target, x, y, event.rangeParent, event.rangeOffset);
                    }
        */            
                },
            
                onMouseOver: function(event)
                {
                    // set a class on our logRow parent identifying this log row as fireconsole controlled
                    // this is used for hover and selected styling
                    helpers.util.setClass(this._getMasterRow(event.target).parentNode, "logRow-" + PACK.__NS__ + "console-message");
        
                    if(helpers.util.getChildByClass(this._getMasterRow(event.target), "__no_inspect")) {
                        return;
                    }
        
                    // populate file/line info tip
        /*            
                    var meta = this._getMasterRow(event.target).repObject.meta;
                    if(meta && (meta["fc.msg.file"] || meta["fc.msg.line"])) {
                        activeInfoTip = event.target.ownerDocument.getElementsByClassName('infoTip')[0];
                        this.fileLineInfoTipTag.replace({
                            "file": meta["fc.msg.file"] || "?",
                            "line": meta["fc.msg.line"] || "?"
                        }, activeInfoTip);
                    } else {
                        activeInfoTip = null;
                    }
        */            
                },
            
                onMouseOut: function(event)
                {
        //            if(activeInfoTip) {
        //                infoTipModule.hideInfoTip(activeInfoTip);
        //            }
                },
                
                onClick: function(event)
                {
        //            if(this.util.getChildByClass(this._getMasterRow(event.target), "__no_inspect")) {
        //                return;
        //            }
                    try {
                        var masterRow = this._getMasterRow(event.target),
                            titleTag = helpers.util.getChildByClass(masterRow, "title"),
                            actionsTag = helpers.util.getChildByClass(helpers.util.getChildByClass(masterRow, "title"), "actions"),
                            valueTag = helpers.util.getChildByClass(helpers.util.getChildByClass(masterRow, "title"), "value"),
                            bodyTag = helpers.util.getChildByClass(masterRow, "body");
            
                        var pointer = {
                            x: event.clientX,
                            y: event.clientY
                        };
                        var masterRect = {
                            "left": titleTag.getBoundingClientRect().left-2,
                            "top": titleTag.getBoundingClientRect().top-2,
                            "right": actionsTag.getBoundingClientRect().left,
                            "bottom": titleTag.getBoundingClientRect().bottom+1
                        };
            
                        if(pointer.x >= masterRect.left && pointer.x <= masterRect.right && pointer.y >= masterRect.top && pointer.y <= masterRect.bottom) {
                            event.stopPropagation();
                            
                            if(masterRow.getAttribute("expanded")=="true") {
            
                                masterRow.setAttribute("expanded", "false");
            
                                helpers.dispatchEvent('contract', [event, {
                                    "message": masterRow.messageObject,
                                    "masterTag": masterRow,
                                    "valueTag": valueTag,
                                    "bodyTag": bodyTag
                                }]);
            
                            } else {
            
                                masterRow.setAttribute("expanded", "true");
            
                                helpers.dispatchEvent('expand', [event, {
                                    "message": masterRow.messageObject,
                                    "masterTag": masterRow,
                                    "valueTag": valueTag,
                                    "bodyTag": bodyTag
                                }]);
            
                                if(!bodyTag.innerHTML) {
            
                                    if(typeof masterRow.messageObject.meta["group.start"] != "undefined") {
                                        this.groupNoMessagesTag.replace({}, bodyTag, this);
                                    } else {
                                        this.expandForMasterRow(masterRow, bodyTag);
                                    }
                                }
                            }
                        } else
                        if(helpers.util.hasClass(event.target, "inspect")) {
                            event.stopPropagation();
                            helpers.dispatchEvent('inspectMessage', [event, {
                                "message": masterRow.messageObject,
                                "masterTag": masterRow,
                                "valueTag": valueTag,
                                "bodyTag": bodyTag,
                                "args": {
                                    "node": masterRow.messageObject.og.getOrigin()
                                }
                            }]);
                        } else
                        if(helpers.util.hasClass(event.target, "file")) {
                            event.stopPropagation();
                            var args = {
                                "file": masterRow.messageObject.meta.file,
                                "line": masterRow.messageObject.meta.line
                            };
                            if(args["file"] && args["line"]) {
                                helpers.dispatchEvent('inspectFile', [event, {
                                    "message": masterRow.messageObject,
                                    "masterTag": masterRow,
                                    "valueTag": valueTag,
                                    "bodyTag": bodyTag,
                                    "args": args
                                }]);
                            }
            /*                
                        } else {
                            event.stopPropagation();
                            helpers.dispatchEvent('click', [event, {
                                "message": masterRow.messageObject,
                                "masterTag": masterRow,
                                "valueTag": valueTag,
                                "bodyTag": bodyTag
                            }]);
            */
                        }
                    } catch(e) {
                        helpers.logger.error(e);
                    }
                },
                
                expandForMasterRow: function(masterRow, bodyTag) {
                    masterRow.setAttribute("expanded", "true");

                    masterRow.messageObject.render(bodyTag, "detail");

/*
                    var rep = this._getRep(masterRow.messageObject, this.CONST_Normal);
                    rep.tag.replace({
                        "node": masterRow.messageObject.getObjectGraph().getOrigin(),
                        "message": masterRow.messageObject
                    }, bodyTag, rep);
*/
                },
        
                _getMasterRow: function(row)
                {
                    while(true) {
                        if(!row.parentNode) {
                            return null;
                        }
                        if(helpers.util.hasClass(row, PACK.__NS__ + "console-message")) {
                            break;
                        }
                        row = row.parentNode;
                    }
                    return row;
                }
            });
        }        
    }
});

exports.renderMessage = function(message, node, options, helpers)
{
    exports.getTemplate(helpers).tag.replace({"message": message}, node);
}
