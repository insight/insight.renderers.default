
require("../pack-helper").init(exports, module, {
    css: require("text!./pack.css"),
    getTemplates: function()
    {
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
