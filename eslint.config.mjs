// eslint.config.mjs
import js from "@eslint/js";
import tsPlugin from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"],
    languageOptions: {
      parser: tsParser,
      ecmaVersion: "latest",
      sourceType: "module",
      globals: {
        console: "readonly", // Adiciona console como uma variável global
        window: "readonly",
        document: "readonly"
      }
    },
    plugins: {
      "@typescript-eslint": tsPlugin
    },
    rules: {
      ...tsPlugin.configs.recommended.rules, // Carrega as regras recomendadas do TypeScript
      // Adicione regras personalizadas aqui
      "indent": ["error", 2],
      "no-multi-spaces": ["error"]
    }
  }
];
