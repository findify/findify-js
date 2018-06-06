const glob = require('glob');
const path = require('path');
const fs = require('fs');

const getFiles = (_root) => new Promise((resolve, reject) => {
  glob(`${_root}/**/*.d.ts`, (err, files) => {
    if (err) return reject(err);
    resolve(files)
  });
});

const getContent = (files, _root) => Promise.all(
  files.map((path, i) =>
    new Promise((resolve) => fs.readFile(path, (_, buffer) => {
      const content = [];
      const formatedPath = path.substr(_root.length + 1).replace('.d.ts', '').replace('/index', '');
      content.push(`declare module '${formatedPath}' {`)
      content.push(buffer.toString())
      content.push(`}\n`)
      resolve(content.join('\n'))
    })
  ))
);

(async () => {
  const _buffer = [];
  const _root = path.resolve(process.cwd(), 'types/');
  const files = await getFiles(_root);
  const contents = await getContent(files.filter(n => !n.includes('types/index')), _root);
  fs.writeFileSync(path.resolve(process.cwd(), 'index.d.ts'), contents.join(''))
})()
