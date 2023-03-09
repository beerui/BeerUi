module.exports = {
  env: {
    browser: true,
    es2017: true,
    node: true
  },
  extends: ["eslint:recommended", "prettier"],
  ignorePatterns: ['*.cjs'],
  overrides: [{
    extends: ['plugin:@typescript-eslint/recommended'],
    files: ['*.svelte'],
    processor: 'svelte3/svelte3'
  }, {
    extends: ['plugin:@typescript-eslint/recommended'],
    files: ['*.ts']
  }],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2019,
    sourceType: 'module'
  },
  plugins: ['svelte3', '@typescript-eslint'],
  root: true,
  settings: {
    'svelte3/typescript': () => require('typescript')
  },
  rules: {
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/no-explicit-any": ["off"],
    "@typescript-eslint/no-inferrable-types": "off" // 简单推断校验
  }
};
