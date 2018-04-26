require('@babel/register');
const webpackConfigFn = require('./scripts').default
const glob = require('glob');
const path = require('path')

module.exports = {
  propsParser: require('react-docgen-typescript').withCustomConfig('./tsconfig.json', [{ skipPropsWithoutDoc: true }]).parse,
  webpackConfig: webpackConfigFn,
  components: () => {
    return glob.sync(path.resolve(__dirname, 'src/**/*.tsx'))
      .filter(module => !module.endsWith('test.tsx'))
  }
}
