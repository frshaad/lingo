import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier';
import checkFile from 'eslint-plugin-check-file';
import drizzle from 'eslint-plugin-drizzle';
import n from 'eslint-plugin-n';
import unicorn from 'eslint-plugin-unicorn';
import globals from 'globals';

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
      'no-nested-ternary': 'off',
      'no-var': 'error',
      curly: 'error',
      'no-extra-label': 'error',
      'no-lone-blocks': 'error',
      'no-useless-concat': 'warn',
      'no-unneeded-ternary': 'error',
      'prefer-regex-literals': 'error',
      'no-constructor-return': 'warn',
      'no-use-before-define': 'error',
      'no-template-curly-in-string': 'error',
      'no-eval': 'error',
      'prefer-rest-params': 'error',
      'no-sequences': 'error',
      'no-param-reassign': 'error',
      'no-else-return': 'error',
      'default-param-last': 'error',
      'prefer-exponentiation-operator': 'error',
      eqeqeq: 'error',
      'no-lonely-if': 'error',
    },
  },
  // Unicorn
  {
    languageOptions: { globals: globals.builtin },
    plugins: { unicorn },
    rules: {
      'unicorn/new-for-builtins': 'error',
      'unicorn/no-useless-switch-case': 'error',
      'unicorn/prefer-array-flat-map': 'error',
      'unicorn/no-document-cookie': 'error',
      'unicorn/prefer-string-slice': 'error',
      'unicorn/prefer-at': 'error',
      'unicorn/prefer-string-trim-start-end': 'error',
      'unicorn/prefer-node-protocol': 'error',
      'unicorn/prefer-number-properties': 'error',
      'unicorn/consistent-existence-index-check': 'error',
      'unicorn/explicit-length-check': 'error',
      'unicorn/no-array-for-each': 'error',
      'unicorn/no-array-push-push': 'error',
      'unicorn/no-array-reduce': 'error',
      'unicorn/no-await-expression-member': 'error',
      'unicorn/no-await-in-promise-methods': 'error',
      'unicorn/no-for-loop': 'error',
      'unicorn/no-invalid-fetch-options': 'error',
      'unicorn/no-lonely-if': 'error',
      'unicorn/no-negated-condition': 'error',
      'unicorn/no-negation-in-equality-check': 'error',
      'unicorn/no-nested-ternary': 'error',
      'unicorn/no-new-array': 'error',
      'unicorn/no-null': 'error',
      'unicorn/no-single-promise-in-promise-methods': 'error',
      'unicorn/no-static-only-class': 'error',
      'unicorn/no-typeof-undefined': 'error',
      'unicorn/no-unnecessary-await': 'error',
      'unicorn/no-unnecessary-polyfills': 'error',
      'unicorn/no-unreadable-array-destructuring': 'error',
      'unicorn/no-unreadable-iife': 'error',
      'unicorn/no-useless-fallback-in-spread': 'error',
      'unicorn/no-useless-length-check': 'error',
      'unicorn/no-useless-spread': 'error',
      'unicorn/no-useless-undefined': 'error',
      'unicorn/no-zero-fractions': 'error',
      'unicorn/numeric-separators-style': 'error',
      'unicorn/prefer-array-find': 'error',
      'unicorn/prefer-array-flat': 'error',
      'unicorn/prefer-array-index-of': 'error',
      'unicorn/prefer-array-some': 'error',
      'unicorn/prefer-date-now': 'error',
    },
  },
  // TypeScript
  {
    rules: {
      '@typescript-eslint/consistent-type-imports': 'error',
      '@typescript-eslint/no-import-type-side-effects': 'error',
      '@typescript-eslint/no-this-alias': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-non-null-assertion': 'error',
      '@typescript-eslint/prefer-as-const': 'error',
      '@typescript-eslint/prefer-function-type': 'error',
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
      'react/void-dom-elements-no-children': 'error',
      'react/jsx-curly-brace-presence': 'error',
    },
  },
  // JSX a11y
  {
    rules: {
      'jsx-a11y/prefer-tag-over-role': 'error',
      'jsx-a11y/no-aria-hidden-on-focusable': 'error',
      'jsx-a11y/lang': 'error',
      'jsx-a11y/no-static-element-interactions': 'error',
      'jsx-a11y/autocomplete-valid': 'error',
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
