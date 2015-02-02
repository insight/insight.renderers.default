
require("../pack-helper").init(exports, module, {
    css: require("./pack.css"),
    getTemplates: function()
    {
        require("./wrappers/console");
        require("./wrappers/viewer");

        return [
            require("./layer"),
            require("./request"),
            require("./response")
        ];
    }
});
