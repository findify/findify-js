const fs = require('fs');
const dir = require('directory-tree');
const path = require('path');
const tree = dir(
  'src',
  { exclude: [/__snapshots__/, /test.ts?$/, /\.css/] }
);

fs.writeFileSync(
  path.resolve(process.cwd(), 'lib/tree.json'),
  JSON.stringify(tree),
  'utf8'
)
