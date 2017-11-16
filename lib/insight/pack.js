
module.id = module.id || "insight_pack";

require("../pack-helper").init(exports, module, {
    css: require("./pack.css.js").toString().split("\n").slice(1, -1).filter(function (line) {
        if (/^\/\//.test(line)) {
            return false;
        }
        return true;
    }).join("\n"),
    getTemplates: function()
    {
        require("./wrappers/console");
        require("./wrappers/viewer");

        return [
            // First: Match by node.meta.renderer
            require("./structures/trace"),
            require("./structures/table"),

            // Second: Utility messages matched by various specific criteria
            require("./util/trimmed"),

            // Third: Match by node.type
            require("./primitives/text"),
            require("./primitives/constant"),
            require("./primitives/array"),
            require("./primitives/map"),
            require("./primitives/reference"),
            require("./primitives/dictionary"),

            // Last: Catch any nodes that did not match above
            require("./primitives/unknown")
        ];
    }
});
