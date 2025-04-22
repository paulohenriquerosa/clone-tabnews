import { defineConfig } from "eslint/config";
import globals from "globals";
import path from "node:path";
import { fileURLToPath } from "node:url";
import js from "@eslint/js";
import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

export default defineConfig([
  {
    ignores: [
      "node_modules/**",
      "dist/**",
      ".next/**",
      "coverage/**",
      "**/*.min.js",
    ],
  },
  {
    extends: compat.extends(
      "eslint:recommended",
      "next/core-web-vitals",
      "plugin:jest/recommended",
      "prettier",
    ),

    languageOptions: {
      globals: {
        ...globals.jest,
      },

      ecmaVersion: "latest",
      sourceType: "module",
    },
  },
]);
