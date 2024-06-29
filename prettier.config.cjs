/** @type {import("prettier").Config} */
module.exports = {
  // i am just using the standard config, change if you need something else
  ...require('prettier-config-standard'),
  semi: true,
  singleQuote: true,
  jsxSingleQuote: true,
  printWidth: 80,
  tabWidth: 2,
  trailingComma: 'es5',
  arrowParens: 'avoid',
  bracketSpacing: true,
  endOfLine: 'auto',
  pluginSearchDirs: [__dirname],
  plugins: [require.resolve('prettier-plugin-astro')],
  overrides: [
    {
      files: '*.astro',
      options: {
        parser: 'astro'
      }
    }
  ]
}
