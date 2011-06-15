
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && typeof node.meta.renderer !== "undefined" && node.meta.renderer === "structures/trace")?true:false;
};

PACK.initTemplate(require, exports, module, {

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
                
                VAR_hideShortTagOnExpand: false,
        
                tag:
                    DIV({"class": PACK.__NS__+"structures-trace"},
                        TABLE({"cellpadding": 3, "cellspacing": 0},
                            TBODY(
                                TR(
                                    TH({"class": "header-file"}, "File"),
                                    TH({"class": "header-line"}, "Line"),
                                    TH({"class": "header-inst"}, "Instruction")
                                ),
                                FOR("frame", "$node|getCallList",
                                    TR({"_frameNodeObj": "$frame.node"},
                                        TD({"class": "cell-file", "onclick":"$onFileClick"}, "$frame.file"),
                                        TD({"class": "cell-line", "onclick":"$onFileClick"}, "$frame.line"),
                                        TD({"class": "cell-inst"},
                                            DIV("$frame|getFrameLabel(",
                                                FOR("arg", "$frame|argIterator",
                                                    DIV({"class": "arg", "_argNodeObj": "$arg.node", "onclick":"$onArgClick"},
                                                        TAG("$arg.tag", {"node": "$arg.node"}),
                                                        IF("$arg.more", SPAN({"class": "separator"}, ","))
                                                    )
                                                ),
                                            ")")
                                        )
                                    )
                                )
                            )
                        )
                    ),
        
                shortTag:
                    SPAN({"class": PACK.__NS__+"structures-trace"}, TAG("$node|getCaptionTag", {"node": "$node|getCaptionNode"})),
        
        
                onFileClick: function(event) {
                    event.stopPropagation();
                    var node = event.target.parentNode.frameNodeObj,
                        frame = node.compact();
                    if(!frame.file || !frame.line) {
                        return;
                    }
                    var args = {
                        "file": frame.file.value,
                        "line": frame.line.value
                    };
                    if(args["file"] && args["line"]) {
                        helpers.dispatchEvent('inspectFile', [event, {
                            "message": node.getObjectGraph().message,
                            "args": args
                        }]);
                    }
                },
        
                onArgClick: function(event) {
                    event.stopPropagation();
                    var tag = event.target;
                    while(tag.parentNode) {
                        if(tag.argNodeObj) {
                            break;
                        }
                        tag = tag.parentNode;
                    }
                    helpers.dispatchEvent('inspectNode', [event, {
                        "message": tag.argNodeObj.getObjectGraph().message,
                        "args": {"node": tag.argNodeObj}
                    }]);
                },
        
                getCaptionTag: function(node) {
                    var rep = helpers.getTemplateForNode(this.getCaptionNode(node));
                    return rep.shortTag || rep.tag;
                },
        
                getCaptionNode: function(node) {
                    if (node.type == "map")
                        return helpers.util.merge(node.compact().title, {"wrapped": false});
                    if (node.type == "dictionary")
                        return helpers.util.merge(node.value.title, {"wrapped": false});
                },

                getTrace: function(node) {
                    if (node.type == "map")
                       return node.compact().trace.value;
                    if (node.type == "dictionary")
                       return node.value.trace.value;
                    helpers.logger.error("Cannot get trace from node", node);
                },
                
                getCallList: function(node) {

                    // TODO: Do this in an init method
                    node.getObjectGraph().message.postRender.keeptitle = true;

                    try {
                        var list = [];
                        this.getTrace(node).forEach(function(node) {
                            frame = node.compact();
                            list.push({
                                'node': node,
                                'file': (frame.file)?frame.file.value:"",
                                'line': (frame.line)?frame.line.value:"",
                                'class': (frame["class"])?frame["class"].value:"",
                                'function': (frame["function"])?frame["function"].value:"",
                                'type': (frame.type)?frame.type.value:"",
                                'args': (frame.args)?frame.args.value:false
                            });
                        });
        
                        // Now that we have all call events, lets see if we can shorten the filenames.
                        // This only works for unix filepaths for now.
                        // TODO: Get this working for windows filepaths as well.
                        try {
                            if (list[0].file.substr(0, 1) == '/') {
                                var file_shortest = list[0].file.split('/');
                                var file_original_length = file_shortest.length;
                                for (var i = 1; i < list.length; i++) {
                                    var file = list[i].file.split('/');
                                    for (var j = 0; j < file_shortest.length; j++) {
                                        if (file_shortest[j] != file[j]) {
                                            file_shortest.splice(j, file_shortest.length - j);
                                            break;
                                        }
                                    }
                                }
                                if (file_shortest.length > 2) {
                                    if (file_shortest.length == file_original_length) {
                                        file_shortest.pop();
                                    }
                                    file_shortest = file_shortest.join('/');
                                    for (var i = 0; i < list.length; i++) {
                                        list[i].file = '...' + list[i].file.substr(file_shortest.length);
                                    }
                                }
                            }
                        } catch (e) {}
        
                        return list;
                    } catch(e) {
                        helpers.logger.error(e);
                    }
                },
        
                getFrameLabel: function(frame)
                {
                    try {
                        if (frame['class']) {
                            if (frame['type'] == 'throw') {
                                return 'throw ' + frame['class'];
                            } else
                            if (frame['type'] == 'trigger') {
                                return 'trigger_error';
                            } else {
                                return frame['class'] + frame['type'] + frame['function'];
                            }
                        }
                        return frame['function'];
                    } catch(e) {
                        helpers.logger.error(e);
                    }
                },
        
                argIterator: function(frame)
                {
                    try {
                        if(!frame.args) {
                            return [];
                        }
                        var items = [];
                        for (var i = 0; i < frame.args.length; i++) {
                            items.push({
                                "node": helpers.util.merge(frame.args[i], {"wrapped": true}),
                                "tag": helpers.getTemplateForNode(frame.args[i]).shortTag,
                                "more": (i < frame.args.length-1)
                            });
                        }
                        return items;
                    } catch(e) {
                        helpers.logger.error(e);
                    }
                }
            });
        }        
    }
});
