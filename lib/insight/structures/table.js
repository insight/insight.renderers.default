
var PACK = require("../pack");

exports.supportsObjectGraphNode = function(node)
{
    return (node.meta && typeof node.meta.renderer !== "undefined" && node.meta.renderer === "structures/table")?true:false;
};

PACK.initTemplate(require, exports, module, {
    __name: "table",
    
    VAR_hideShortTagOnExpand: false,
    
    initRep: function(DOMPLATE, helpers)
    {
        var T = DOMPLATE.tags;
        
        return DOMPLATE.domplate({

            VAR_hideShortTagOnExpand: false,

            tag:
                T.DIV({"class": PACK.__NS__+"structures-table"},
                    TABLE({"cellpadding": 3, "cellspacing": 0},
                        TBODY(
                            TR({"class":"$node|getHeaderClass"},
                                T.FOR("column", "$node|getHeaders",
                                    TH({"class": "header"}, T.TAG("$column.tag", {"node": "$column.node"}))
                                ),
                                T.IF("$node|hasNoHeader",
                                    TH()    // needed to fix gecko bug that does not render table border if empty <tr/> in table
                                )
                            ),
                            T.FOR("row", "$node|getRows",
                                TR(
                                    T.FOR("cell", "$row|getCells",
                                        TD({"class": "cell", "_cellNodeObj": "$cell.node", "onclick":"$onCellClick"},
                                            T.TAG("$cell.tag", {"node": "$cell.node"}))
                                    )
                                )
                            )
                        )
                    )
                ),

            shortTag:
                T.SPAN({"class": PACK.__NS__+"structures-table"}, T.TAG("$node|getTitleTag", {"node": "$node|getTitleNode"})),

            getTitleTag: function(node) {
                var rep = helpers.getTemplateForNode(this.getTitleNode(node));
                return rep.shortTag || rep.tag;
            },

            getTitleNode: function(node) {
                return helpers.util.merge(node.compact().title, {"wrapped": false});
            },
            
            getHeaderClass: function(node)
            {
                if (this.hasNoHeader(node)) {
                    return "hide";
                } else {
                    return "";
                }
            },

            hasNoHeader: function(node) {
                var header = node.compact().header;
                if(!header || header.type!="array") {
                    return true;
                }
                return false;
            },

            getHeaders: function(node) {
                var header = node.compact().header;
                if(!header || header.type!="array") {
                    return [];
                }
                var items = [];
                for (var i = 0; i < header.value.length; i++) {
                    var rep = helpers.getTemplateForNode(header.value[i]);
                    items.push({
                        "node": helpers.util.merge(header.value[i], {"wrapped": false}),
                        "tag": rep.shortTag || rep.tag
                    });
                }
                return items;
            },
    
            getRows: function(node) {
                var data = node.compact().data;
                if(!data || data.type!="array") {
                    return [];
                }
                return data.value;
            },
    
            getCells: function(node) {
                var items = [];
                if(node.value) {
                    for (var i = 0; i < node.value.length; i++) {
                        var rep = helpers.getTemplateForNode(node.value[i]);
                        items.push({
                            "node": helpers.util.merge(node.value[i], {"wrapped": false}),
                            "tag": rep.shortTag || rep.tag
                        });
                    }
                } else
                if(node.meta && node.meta['encoder.trimmed']) {
                    var rep = helpers.getTemplateForNode(node);
                    items.push({
                        "node": helpers.util.merge(node, {"wrapped": false}),
                        "tag": rep.shortTag || rep.tag
                    });
                }
                return items;
            },
    
            onCellClick: function(event) {
                event.stopPropagation();

                //var masterRow = this._getMasterRow(event.target);
                //masterRow.messageObject

                var tag = event.target;
                while(tag.parentNode) {
                    if (tag.cellNodeObj) {
                        break;
                    }
                    tag = tag.parentNode;
                }
                helpers.dispatchEvent('inspectNode', [event, {
                    //"message": masterRow.messageObject,
                    "args": {"node": tag.cellNodeObj}
                }]);
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
});
