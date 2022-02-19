module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
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
  },
};
