module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  'settings': {
    'react': {
      'version': 'detect'
    }
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:storybook/recommended',
  ],
  ignorePatterns: [
    './storybook',
    'vite.*.ts',
    'vite-env.d.ts',
    './vite'
  ],
  overrides: [],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
    'eslint-plugin-import-order',
    'eslint-plugin-import',
    'eslint-plugin-react-hooks',
    'react',
    'typescript-sort-keys'
  ],
  rules: {
    'additional-rule': 'off',
    'arrow-body-style': 'off',
    'arrow-parens': ['error', 'always'],
    'eol-last': ['error', 'always'],
    'import/newline-after-import': [
      'error',
      {
        count: 1,
      },
    ],
    'max-len': [
      'error',
      {
        code: 120,
      },
    ],
    'multiline-ternary': ['error', 'always'],
    'no-console': 'error',
    'import/order': [
      'error',
      {
        groups: [
          'external',
          'builtin',
          'internal',
          'sibling',
          'parent',
          'index',
        ],
      },
    ],
    indent: ['error', 2],
    'padding-line-between-statements': [
      'error',
      {
        blankLine: 'always',
        prev: 'while',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: 'if',
        next: '*',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'if',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'return',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'while',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'function',
      },
      {
        blankLine: 'always',
        prev: '*',
        next: 'for',
      },
      {
        blankLine: 'always',
        prev: 'for',
        next: '*',
      },
    ],
    quotes: [
      2,
      'single',
      {
        avoidEscape: true,
      },
    ],
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',
    'react/no-array-index-key': 'error',
    'react/jsx-uses-react': 'error',
    'react/jsx-max-props-per-line': 'error',
    'react/jsx-sort-props': 'error',
    'typescript-sort-keys/interface': 'error',
    'typescript-sort-keys/string-enum': 'error',
    semi: ['error', 'always'],
  },
};
