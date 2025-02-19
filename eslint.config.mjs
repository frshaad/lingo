// @ts-check
import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import configPrettier from 'eslint-config-prettier';
import n from 'eslint-plugin-n';
import tailwind from 'eslint-plugin-tailwindcss';
import unicorn from 'eslint-plugin-unicorn';
import tseslint from 'typescript-eslint';

const MAX_JSX_DEPTH = 4;
const MAX_DEPTH = 4;
const MAX_FN_PARAMS = 3;

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

export default tseslint.config([
  { languageOptions: { globals: { React: true } }, ignores: ['node_modules'] },
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
  unicorn.configs.recommended,
  {
    rules: {
      'unicorn/prevent-abbreviations': [
        'error',
        {
          allowList: {
            util: true,
            utils: true,
            prop: true,
            props: true,
            param: true,
            params: true,
            env: true,
            db: true,
          },
        },
      ],
      'unicorn/prefer-string-raw': 'off',
      'unicorn/better-regex': 'error',
      'unicorn/consistent-destructuring': 'error',
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
      '@typescript-eslint/no-unused-vars': 'off',
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
  // N (Node.js)
  {
    plugins: { n },
    rules: { 'n/no-process-env': 'error' },
  },
  // Tailwind
  ...tailwind.configs['flat/recommended'],
  // Prettier
  configPrettier,
]);
