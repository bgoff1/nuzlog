const path = require("path");

module.exports = {
  env: { browser: true, es6: true },
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:tailwindcss/recommended",
    "plugin:solid/recommended",
  ],
  parser: "@typescript-eslint/parser",
  ignorePatterns: ["dist", "public", ".eslintrc.cjs", "*.gen.ts"],
  parserOptions: { ecmaVersion: "latest", sourceType: "module" },
  rules: {
    "@typescript-eslint/no-unused-vars": [
      "error",
      {
        args: "after-used",
        varsIgnorePattern: "^_",
        argsIgnorePattern: "^_",
        ignoreRestSiblings: true,
        destructuredArrayIgnorePattern: "^_",
        caughtErrorsIgnorePattern: "^_",
      },
    ],
    "object-shorthand": "error",
    "no-shadow": "error",
    "@typescript-eslint/consistent-type-imports": "error",
  },
  settings: {
    tailwindcss: {
      config: path.join(__dirname, "tailwind.config.ts"),
    },
  },
};
