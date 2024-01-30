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
  ignorePatterns: [
    "dist",
    "public",
    ".eslintrc.cjs",
    "*.gen.ts",
    "postcss.config.js",
  ],
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
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "solid-js",
            importNames: ["useContext", "createContext"],
            message:
              "Please use context methods from /context/context-helpers instead.",
          },
        ],
      },
    ],
    "object-shorthand": "error",
    "no-shadow": "error",
    "@typescript-eslint/consistent-type-imports": [
      "error",
      {
        disallowTypeAnnotations: false,
      },
    ],
  },
  settings: {
    tailwindcss: {
      config: path.join(__dirname, "tailwind.config.ts"),
    },
  },
};
