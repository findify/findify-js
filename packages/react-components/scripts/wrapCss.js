const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const prefixwrap = require('postcss-wrap');

new Promise(resolve => {
  const file = fs.readFileSync(path.resolve(process.cwd(), 'dist/styles.css'));
  postcss([
    prefixwrap({
      selector: '.findify-root',
      skip: ['.findify-root', '.frame-content'],
    }),
    require('cssnano')({ preset: 'default' }),
  ])
    .process(file)
    .then(result => {
      fs.writeFileSync(
        path.resolve(process.cwd(), 'dist/wrapped.css'),
        result.css
      );
      resolve();
    });
});
