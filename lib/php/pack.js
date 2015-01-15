
require("../pack-helper").init(exports, module, {
    css: require("./pack.css"),
    getTemplates: function()
    {
        return [

            // Second: Utility messages matched by various specific criteria
            require("../insight/util/trimmed"),

            require("./primitives/array-indexed"),
            require("./primitives/array-associative"),
            require("./primitives/boolean"),
            require("./primitives/exception"),
            require("./primitives/float"),
            require("./primitives/integer"),
            require("./primitives/null"),
            require("./primitives/object"),
            require("./primitives/object-reference"),
            require("./primitives/resource"),
            require("./primitives/string"),
            require("./primitives/unknown")
        ];
    }
});
