
require("../pack-helper").init(exports, module, {
    css: require("./pack.css"),
    getTemplates: function()
    {
        require("./wrappers/console");

        return [
            require("./layout")
        ];
    }
});
