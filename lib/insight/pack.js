
require("../pack-helper").init(exports, module, {
    css: require("./pack.css"),
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
