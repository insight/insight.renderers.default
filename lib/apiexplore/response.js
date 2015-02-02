
var PACK = require("./pack");

function condenseObjectDeep(nodes) {
    var data = {};
    nodes.forEach(function (node) {
        data[node[0].value] = node[1].value;
    });
    return data;
}

function condenseObjectShallow(nodes) {
    var data = {};
    nodes.forEach(function (node) {
        data[node[0].value] = node[1];
    });
    return data;
}

exports.supportsObjectGraphNode = function(node)
{
    if (node.type === "map" && node.value.forEach) {
        var data = condenseObjectDeep(node.value);        
        if (data.__fc_tpl_id === "insight.renderers.default/apiexplore/response") {
            return true;
        }
    }

    return false;
};

PACK.initTemplate(require, exports, module, {

    type: "response",

    initRep: function(DOMPLATE, helpers)
    {
        with(DOMPLATE.tags)
        {
            return DOMPLATE.domplate({
        
                tag:
                    TAG("$message|_getDataTag", {
                        "node": "$message|_getDataValue",
                        "message": "$message",
                        "_templateObject": "$message|_getTemplateObject"
                    }),

                _getTemplateObject: function () {
                    return this;
                },

                _getDataTag: function(message)
                {
                    var data = condenseObjectDeep(message.og.getOrigin().value);
                    var info = condenseObjectShallow(data.info);
                    var template = helpers.getTemplateForNode(info.data);
                    return template.tag;                    
                },

                _getDataValue: function(message)
                {
                    var data = condenseObjectDeep(message.og.getOrigin().value);
                    var info = condenseObjectShallow(data.info);
                    return info.data;
                }
            });
        }        
    },

});
