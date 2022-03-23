module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parser: 'babel-eslint',
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
      experimentalObjectRestSpread: true
    },
    ecmaVersion: 6,
    sourceType: 'module',
  },
  plugins: [
    'react'
  ],
  rules: {
    'linebreak-style': 'off',
    'arrow-parens': ['error', 'as-needed'],
    'implicit-arrow-linebreak': 'off',
    'no-underscore-dangle': 'off',
    'react/jsx-filename-extension': 'off',
    'no-confusing-arrow': 'off',
    'comma-dangle': ['error', {
      objects: 'only-multiline',
      functions: 'never',
      arrays: 'only-multiline'
    }],
    'no-unused-expressions': 'off',
    'react/prop-types': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/interactive-supports-focus': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'react/jsx-props-no-spreading': ['error', {
      custom: 'ignore'
    }],
    'prefer-promise-reject-errors': 'off',
    'no-console': 'off'
  },
};
