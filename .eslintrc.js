const { config } = require("@dhis2/cli-style");

module.exports = {
  extends: [config.eslintReact, "plugin:cypress/recommended"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules", "src/"],
      },
    },
  },
  globals: {
    cy: true,
  },
  rules: {
    "react/prop-types": "off",
    "react/no-unused-prop-types": "off"
  },
};
