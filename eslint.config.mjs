import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import prettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
  { ignores: ['build/', 'dev-dist/', 'src/onitamalib/'] },
  js.configs.recommended,
  react.configs.flat.recommended,
  react.configs.flat['jsx-runtime'],
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: globals.browser,
    },
    plugins: { 'react-hooks': reactHooks },
    settings: { react: { version: 'detect' } },
    rules: {
      'react-hooks/rules-of-hooks': 'error',
      'react-hooks/exhaustive-deps': 'warn',
      'no-unused-vars': 'warn',
      // React 19 no longer checks propTypes, so they are not used
      'react/prop-types': 'off',
    },
  },
  {
    files: ['src/**/*.worker.js'],
    languageOptions: { globals: globals.worker },
  },
  {
    files: ['src/service-worker.js'],
    languageOptions: { globals: globals.serviceworker },
  },
  {
    files: ['vite.config.mjs', 'eslint.config.mjs'],
    languageOptions: { globals: globals.node },
  },
  prettierRecommended,
];
