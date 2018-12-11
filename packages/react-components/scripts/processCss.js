const fs = require('fs');
const postcss = require('postcss');
const hoist = require('./postcssHoistVars');
const duplicates = require('postcss-discard-duplicates');
const empty = require('postcss-discard-empty');
const perfectionist = require('perfectionist');
const cssnano = require('cssnano');
const properties = require('postcss-custom-properties');
const nested = require('postcss-nested');
const variables = require('postcss-css-variables');
const prefixwrap = require('./postcssWrap');

fs.readFile('lib/raw.css', (err, css) =>{
  postcss([hoist, duplicates, empty, perfectionist])
    .process(css, { from: 'lib/raw.css' })
    .then(result => fs.writeFile('lib/raw.css', result.css, () => true))

  postcss([
    properties,
    nested,
    variables,
    cssnano({ preset: 'default' }),
    prefixwrap({
      wrap: '.findify-container',
      skip: [
        '.findify-container',
        '.findify-components-common--drawer__backdrop',
        '.findify-components-common--drawer__content',
        '.findify-components-common--drawer__body-no-scroll'
      ]
    })
  ])
    .process(css, { from: 'lib/raw.css' })
    .then(result => fs.writeFile('lib/styles.css', result.css, () => true))
});
