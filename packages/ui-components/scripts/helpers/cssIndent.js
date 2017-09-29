const path = require('path');
const { decamelize } = require('humps');

const mapper = {
  widgets: 'widget',
  internals: 'block',
};

const getLocalIdent = (loaderContext, _, localName) => {
  const rootDir = path.join(loaderContext.options.context, 'src');
  const sourcePath = path
    .relative(rootDir, loaderContext.resourcePath)
    .split('/')
    .slice(0, -1)
    .map(element => mapper[element] || element)
    .join('-');

  const className = localName === 'root' ? '' : '__' + localName;
  return `findify-${decamelize(sourcePath, { separator: '-' })}${className}`;
};

module.exports = {
  getLocalIdent,
};
