const TerserPlugin = require('terser-webpack-plugin');
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer');

module.exports.optimization = {
  mergeDuplicateChunks: true,
  usedExports: true,
  mangleExports: 'size',
  concatenateModules: true,
  minimizer: [
    new TerserPlugin({
      extractComments: true,
      parallel: true,
    }),
  ], 
}

module.exports.BundleAnalyzer = new BundleAnalyzerPlugin({
  analyzerMode: 'server',
  analyzerPort: 8888,
  openAnalyzer: true,
  reportFilename: 'stats/webpack.stats.html',
  statsFilename: 'stats/webpack.stats.json',
});
