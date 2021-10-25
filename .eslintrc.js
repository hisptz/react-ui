const {config} = require("@dhis2/cli-style");

module.exports = {
    extends: [config.eslintReact],
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx"],
                moduleDirectory: ['node_modules', 'src/'],
            }
        }
    }
};
