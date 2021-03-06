const { config } = require("@dhis2/cli-style");

module.exports = {
  extends: [
    config.eslintReact,
    "plugin:cypress/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
        moduleDirectory: ["node_modules"],
      },
    },
  },
  globals: {
    cy: true,
  },
  rules: {
    "react/prop-types": "off",
    "react/no-unused-prop-types": "off",
    "react-hooks/exhaustive-deps": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "import/extensions": "off",
    "@typescript-eslint/explicit-member-accessibility": "off",
  },
};
