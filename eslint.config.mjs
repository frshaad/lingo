import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import drizzle from 'eslint-plugin-drizzle';
import simpleImportSort from 'eslint-plugin-simple-import-sort';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    'standard',
    'next/core-web-vitals',
    'next/typescript',
    'plugin:drizzle/recommended',
    'prettier',
  ),
  {
    plugins: {
      drizzle,
      'simple-import-sort': simpleImportSort,
    },

    rules: {
      'simple-import-sort/imports': 'error',
      'simple-import-sort/exports': 'error',
      'drizzle/enforce-delete-with-where': 'off',
      'drizzle/enforce-update-with-where': 'off',
    },
  },
];

export default eslintConfig;
