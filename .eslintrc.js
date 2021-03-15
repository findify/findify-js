module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  env: {
    browser: true,
    node: true,
    es6: true
  },
  plugins: [
    '@typescript-eslint',
  ],
  extends: [
    'eslint:recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  "rules": {
    "no-warning-comments": [1, { "terms": ["todo", "fixme"], "location": "anywhere" }],
    "quotemark": [0, "single"],
    "import-name": 0,
    "function-name": 0,
    "object-literal-sort-keys": 0,
    "ordered-imports": 0,
    "interface-name": 0,
    "switch-default": 0
  }
}; 
