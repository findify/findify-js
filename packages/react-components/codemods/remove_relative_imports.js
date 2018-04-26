const path = require('path');
/**
 * This is a Codemod for migrating relative imports from react-components
 * to absolute imports handled by babel-plugin-module-resolver
 * @param {*} fileInfo
 * @param {*} api
 * @param {*} options
 */
module.exports = (fileInfo, api, options) => {
  if (fileInfo.path.endsWith('test.tsx')) {
    console.log(`Skipping test`, fileInfo.path)
    return;
  }
  let newSource = fileInfo.source
  const rootDirectory = options.path.find(p => fileInfo.path.startsWith(p))
  const importLines = fileInfo.source.split('\n').filter(line => line.startsWith('import'))
  importLines
    .map(line => line.match(/^(import .* from )(?:(?:'|")?)([a-zA-Z0-9/\.]*)(?:(?:'|")?;?)$/))
    .filter(match => match && match[2].startsWith('.'))
    .forEach(item => {
      let relativeImport = path.relative(
        path.join(process.cwd(), rootDirectory),
        path.join(
          path.dirname(
            path.join(process.cwd(), fileInfo.path)
          ),
          item[2])
      )
      if (relativeImport.endsWith('index')) {
        const tempArr = relativeImport.split('/')
        tempArr.pop()
        relativeImport = relativeImport.join('/')
      }
      newSource = newSource.replace(item[0], item[1] + `'${relativeImport}';`)
    })
  if (newSource !== fileInfo.source)
    console.log('Processed', fileInfo.path)
  return newSource;
}
