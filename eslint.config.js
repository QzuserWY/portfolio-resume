import js from "@eslint/js"
import globals from "globals"
import vue from "eslint-plugin-vue"
import vueParser from "vue-eslint-parser"

export default [
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  js.configs.recommended,
  ...vue.configs["flat/recommended"],
  {
    files: ["**/*.{js,mjs,cjs,vue}"],
    languageOptions: {
      parser: vueParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.node,
      },
      parserOptions: {
        parser: {
          js: "espree",
        },
      },
    },
    rules: {
      "no-unused-vars": [
        "warn",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
        },
      ],
      "vue/require-v-for-key": "warn",
      "vue/valid-v-for": "warn",
      "vue/require-prop-type-constructor": "warn",
      "vue/return-in-computed-property": "warn",
      "vue/valid-template-root": "off",
      "vue/multi-word-component-names": "off",
    },
  },
]
