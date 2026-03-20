const expoConfig = require('eslint-config-expo/flat');
const prettierConfig = require('eslint-plugin-prettier/recommended');

module.exports = [
  ...expoConfig,
  prettierConfig,
  {
    ignores: ['dist/*', 'node_modules/*', '.expo/*'],
  },
];
