module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb-base',
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    // 'import/prefer-default-export': 'off',
    // 'func-names': 'off',
    // 'consistent-return': 'off',
    // 'no-unused-vars': 'off',
    // 'prefer-destructuring': 'off',
    // 'no-restricted-globals': 'off',
    'no-param-reassign': 'off',
    'import/extensions': 'off',
    'no-undef': 'off',
    'no-underscore-dangle': 'off',
  },
};
