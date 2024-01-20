const { builtinModules } = require("module");

/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  env: {
    es6: true,
  },
  extends: [
    // ...
    "plugin:astro/recommended",
  ],
  // ...
  parserOptions: {
    //   parser: "@typescript-eslint/parser",
    //   extraFileExtensions: [".astro"],
    sourceType: "module",
    ecmaVersion: lastest,
  },
  overrides: [
    {
      // Define the configuration for `.astro` file.
      files: ["*.astro"],
      // Allows Astro components to be parsed.
      parser: "astro-eslint-parser",
      // Parse the script in `.astro` as TypeScript by adding the following configuration.
      // It's the setting you need when using TypeScript.
      parserOptions: {
        //   parser: "@typescript-eslint/parser",
        //   extraFileExtensions: [".astro"],
      },
      rules: {
        // override/add rules settings here, such as:
        // "astro/no-set-html-directive": "error"
      },
    },
    // ...
  ],
};
