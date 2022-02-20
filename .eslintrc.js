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
    'react/prop-types': 'off'
  },
};
