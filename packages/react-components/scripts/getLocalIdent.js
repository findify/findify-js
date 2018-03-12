const path = require('path');
const { decamelize } = require('humps');

const rootDir = path.join(__dirname, '../src');

const computePath = (path, name) => {
  const sourcePath = path
    .slice(rootDir.length+1)
    .split('/')
    .slice(0, -1)
    .join('-');
  const className = name === 'root' ? '' : '__' + name;
  console.log(className);
  return `findify-${decamelize(sourcePath, { separator: '-' })}${className}`;
}

module.exports.styleLoader = (context, localIdentName, localName, options) =>
  computePath(context.resourcePath, localName);

module.exports = (name, filename) =>
  computePath(filename, name);
