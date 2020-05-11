module.exports = {
  env: {
    browser: false,
    es6: true,
    node: true,
    'jest/globals': true,
  },
  extends: ['plugin:prettier/recommended'],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  plugins: ['jest'],
  parserOptions: {
    ecmaVersion: 2018,
    sourceType: 'module',
  },
  rules: {
    'space-before-function-paren': 0,
  },
}
