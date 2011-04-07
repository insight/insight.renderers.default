
require("../pack-helper").init(exports, module, {
    css: require("text!./pack.css"),
    getTemplates: function()
    {
        return [
            require("./util/trimmed"),

            require("./primitives/text"),
            require("./primitives/constant"),
            require("./primitives/array"),
            require("./primitives/map"),
            require("./primitives/reference"),
            require("./primitives/dictionary"),

            require("./structures/trace"),
            require("./structures/table"),

            require("./primitives/unknown")
        ];
    }
});
