const fs = require('fs');
const postcss = require('postcss');
const hoist = require('./postcssHoistVars');
const duplicates = require('postcss-discard-duplicates');
const empty = require('postcss-discard-empty');
const perfectionist = require('perfectionist');

fs.readFile('lib/raw.css', (err, css) =>
  postcss([hoist, duplicates, empty, perfectionist])
    .process(css)
    .then(result => fs.writeFile('lib/raw.css', result.css))
);
