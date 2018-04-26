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
  return `findify-${decamelize(sourcePath, { separator: '-' })}${className}`;
}

module.exports = (...args) => 
  typeof args[0] === 'string'
  ? computePath(args[1], args[0]) // Postcss-modules support
  : computePath(args[0].resourcePath, args[2]); // CSS-loader support
