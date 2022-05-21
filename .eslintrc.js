const IGNORE = 'off'
const WARNING = 'warn'
const ERROR = 'error'

module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'eslint:recommended',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:react-hooks/recommended',
    'next',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: ['react', '@typescript-eslint'],
  settings: {
    react: {
      version: 'detect',
    },
  },
  rules: {
    'no-async-promise-executor': IGNORE,
    'no-case-declarations': IGNORE,
    'no-empty-pattern': IGNORE,
    'require-yield': IGNORE,
    'react/display-name': IGNORE,
    'react-hooks/exhaustive-deps': ERROR,
    '@typescript-eslint/no-explicit-any': IGNORE,
    '@typescript-eslint/no-empty-function': IGNORE,
    '@typescript-eslint/no-empty-interface': IGNORE,
    '@typescript-eslint/no-unused-vars': [
      ERROR,
      { args: 'all', argsIgnorePattern: '^_' },
    ],
  },
}
