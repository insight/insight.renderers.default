
var DOMPLATE = require("domplate/domplate");

exports.init = function(packExports, packModule, packOptions)
{
    var templates;
    packExports.__NS__ = "__" + packModule.hashId + "__";
    packExports.getTemplateForNode = function(node)
    {
        if (!templates)
            templates = packOptions.getTemplates();

        var found;
        templates.forEach(function(template)
        {
            if (found)
                return;
            if (template.supportsObjectGraphNode(node))
                found = template;
        });
        if (!found)
            return false;
        return found;
    }
    
    var cssImported = false;
    function importCss(helpers)
    {
        if (!cssImported)
        {
            cssImported = true;

            var css = packOptions.css;

            css = css.replace(/__NS__/g, packExports.__NS__);
            css = css.replace(/__RESOURCE__/g, helpers.getResourceBaseUrl(packModule));

            helpers.importCssString(packModule.id, css, helpers.document);
        }
    }
    
    packExports.initTemplate = function(require, exports, module, template)
    {
        exports.getTemplatePack = function()
        {
            return packExports;
        };
        exports.getTemplateLocator = function()
        {
            var m = module.id.split("/");
            return {
                id: "github.com/pinf/insight-renderer-templates/",
                module: m.splice(m.length-3,3).join("/")
            };
        };
        if (typeof exports.supportsObjectGraphNode == "undefined")
        {
            exports.supportsObjectGraphNode = function(node)
            {
                return (node.type == template.type);
            };
        }

        exports.getTemplate = function(helpers, subclass)
        {
            var rep;
// NOTE: This needs to go as this gets called multiple times with different 'subclass'            
//            if (typeof rep == "undefined")
//            {
                importCss(helpers);
                rep = template.initRep({
                    tags: DOMPLATE.tags,
                    domplate: function(tpl)
                    {
                        if (subclass)
                            tpl = helpers.util.merge(tpl, subclass);
                        if (tpl.inherits)
                        {
                            var inherits = tpl.inherits;
                            delete tpl.inherits;
                            return inherits.getTemplate(helpers, tpl);
                        }
                        else
                            return DOMPLATE.domplate(tpl);
                    }
                }, helpers);
                rep.getTemplate = function()
                {
                    return exports;
                };
//            }
            return rep;
        }

        exports.renderObjectGraphToNode = function(ogNode, domNode, options, helpers)
        {
            var tpl = exports.getTemplate(helpers);
            for (var i=0, ic=options.view.length ; i<ic ; i++)
            {
                var tag;
                switch(options.view[i])
                {
                    case "detail":
                        tag = "tag";
                        break;
                    default:
                    case "summary":
                        tag = "shortTag";
                        break;
                }
                if (typeof tpl[tag] != "undefined")
                {
                    tpl[tag].replace({"node": ogNode}, domNode);
                    return;
                }
            }
        };
    }
}
