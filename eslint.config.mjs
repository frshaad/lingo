import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import drizzle from 'eslint-plugin-drizzle';
import n from 'eslint-plugin-n';

const MAX_JSX_DEPTH = 4;
const MAX_DEPTH = 4;
const MAX_FN_PARAMS = 3;

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  { languageOptions: { globals: { React: true } } },
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  // ESlint JS
  js.configs.recommended,
  {
    rules: {
      'prefer-arrow-callback': 'error',
      'prefer-const': 'error',
      'prefer-template': 'error',
      'max-depth': ['warn', { max: MAX_DEPTH }],
      'max-params': ['error', { max: MAX_FN_PARAMS }],
      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],
      'no-nested-ternary': 'error',
      'no-var': 'error',
    },
  },
  // TypeScript
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
    },
  },
  // React
  {
    rules: {
      'react/button-has-type': 'error',
      'react/jsx-max-depth': ['warn', { max: MAX_JSX_DEPTH }],
      'react/jsx-no-constructed-context-values': 'error',
      'react/jsx-no-leaked-render': 'error',
      'react/jsx-no-useless-fragment': ['warn', { allowExpressions: true }],
      'react/jsx-pascal-case': ['error', { allowNamespace: true }],
      'react/jsx-sort-props': [
        'warn',
        {
          callbacksLast: true,
          shorthandLast: true,
        },
      ],
      'react/no-access-state-in-setstate': 'error',
      'react/no-array-index-key': 'error',
      'react/no-danger': 'error',
      'react/self-closing-comp': 'error',
    },
  },
  // JSX a11y
  {
    rules: {
      'jsx-a11y/prefer-tag-over-role': 'error',
    },
  },
  // Check-File
  {
    plugins: { 'check-file': checkFile },
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/!(__tests__)': 'KEBAB_CASE' },
      ],
    },
  },
  // N (Node.js)
  {
    plugins: { n },
    rules: { 'n/no-process-env': 'error' },
  },
  // Drizzle
  {
    plugins: { drizzle },
    rules: {
      'drizzle/enforce-delete-with-where': 'error',
      'drizzle/enforce-update-with-where': 'error',
    },
  },
  // Prettier
  eslintConfigPrettier,
];

export default eslintConfig;
