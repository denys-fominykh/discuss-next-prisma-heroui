import { FlatCompat } from '@eslint/eslintrc';
import js from '@eslint/js';
import next from '@next/eslint-plugin-next';
import tsEslintParser from '@typescript-eslint/parser';
import importPlugin from 'eslint-plugin-import';
import prettier from 'eslint-plugin-prettier';
import prettierConfigRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import tailwind from 'eslint-plugin-tailwindcss';
import tsEslint from 'typescript-eslint';
// import jsxA11y from 'eslint-plugin-jsx-a11y';
// import react from 'eslint-plugin-react';

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
  recommendedConfig: [
    js.configs.recommended,
    next.configs.recommended,
    importPlugin.flatConfigs.recommended,
    prettierConfigRecommended,
    ...tailwind.configs['flat/recommended'],
  ],
  allConfig: js.configs.all,
});

export default tsEslint.config(
  tsEslint.configs.recommended,
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs,cjs}'],
    plugins: {
      'react-hooks': reactHooks,
      prettier,
      // 'jsx-a11y': jsxA11y, // it's already being included by the Next.js ESLint configurations
      // react, // it's already being included by the Next.js ESLint configurations
    },
    extends: [importPlugin.flatConfigs.typescript],
    languageOptions: {
      parser: tsEslintParser,
      parserOptions: {
        project: true,
      },
      ecmaVersion: 'latest',
      sourceType: 'module',
    },
    rules: {
      // 'react/jsx-uses-react': 'error', // it's already being included by the Next.js ESLint configurations
      // 'react/jsx-uses-vars': 'error', // it's already being included by the Next.js ESLint configurations
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      // 'jsx-a11y/alt-text': 'error', // it's already being included by the Next.js ESLint configurations
      'import/no-named-as-default': 0,
      'import/order': [
        'error',
        {
          groups: ['builtin', 'external', 'internal'],
          pathGroups: [
            {
              pattern: 'react',
              group: 'external',
              position: 'before',
            },
          ],
          'newlines-between': 'always',
          alphabetize: {
            order: 'asc',
            caseInsensitive: true,
          },
        },
      ], // configure import order, import from react always first
      'no-restricted-syntax': [
        'error',
        {
          selector: "JSXElement > JSXExpressionContainer > LogicalExpression[operator!='??']",
          message: 'Logical AND is forbidden for conditional rendering. Use ternaries instead',
        },
      ],
      '@typescript-eslint/no-var-requires': 0,
      'prettier/prettier': [
        'error',
        {
          singleQuote: true,
        },
      ],
      'no-unused-vars': 'off',
      'import/no-dynamic-require': 'warn',
      'import/no-nodejs-modules': 'warn',
    },
  },
  {
    ignores: [
      '.next/*',
      '.husky/*',
      'node_modules/*',
      'public/*',
      'build/*',
      'prisma/*',
      '.babelrc',
      '.prettierrc.cjs',
      '.prettierrc.js',
      'lint-staged.config.js',
      'next-env.d.ts',
      'package.json',
      'pnpm-lock.yaml',
      'yarn.lock',
      'package-lock.json',
      'tsconfig.json',
    ],
  },
);
