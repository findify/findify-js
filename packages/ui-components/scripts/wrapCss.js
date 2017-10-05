const path = require('path');
const fs = require('fs');
const postcss = require('postcss');
const prefixwrap = require('postcss-wrap');
const argv = require('yargs').argv;
const chokidar = require('chokidar');

const resolveInDist = fileName =>
  path.resolve(process.cwd(), `dist/${fileName}`);
const srcFilePath = resolveInDist('styles.css');
const dstFilePath = resolveInDist('wrapped.css');

function compile() {
  new Promise(resolve => {
    const file = fs.readFileSync(srcFilePath);
    postcss([
      prefixwrap({
        selector: '.findify-root',
        skip: ['.findify-root', '.frame-content'],
      }),
      require('cssnano')({ preset: 'default' }),
    ])
      .process(file)
      .then(result => {
        fs.writeFileSync(dstFilePath, result.css);
        console.log(`wrapped css was written to dist/wrapped.css`);
        resolve();
      });
  });
}

compile();
if (argv.watch) {
  console.log(
    `watching and recompiling (wrapping): dist/styles.css -> dist/wrapped.css`
  );
  chokidar.watch(srcFilePath).on('change', () => {
    console.log(`dist/styles.css has changed, recompiling...`);
    compile();
  });
}
