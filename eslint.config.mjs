import { FlatCompat } from '@eslint/eslintrc';
import checkFile from 'eslint-plugin-check-file';
import drizzle from 'eslint-plugin-drizzle';
import nodePlugin from 'eslint-plugin-n';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript', 'prettier'),
  {
    plugins: {
      'check-file': checkFile,
      n: nodePlugin,
      drizzle,
    },
    rules: {
      'prefer-arrow-callback': 'error',
      'prefer-template': 'error',
      'no-useless-rename': [
        'error',
        {
          ignoreDestructuring: false,
          ignoreImport: false,
          ignoreExport: false,
        },
      ],
      'react/button-has-type': 'error',
      'check-file/filename-naming-convention': [
        'error',
        { '**/*.{ts,tsx}': 'KEBAB_CASE' },
        { ignoreMiddleExtensions: true },
      ],
      'check-file/folder-naming-convention': [
        'error',
        { 'src/**/!(__tests__)': 'KEBAB_CASE' },
      ],
      'n/no-process-env': 'error',
      'drizzle/enforce-delete-with-where': 'error',
      'drizzle/enforce-update-with-where': 'error',
    },
  },
];

export default eslintConfig;
