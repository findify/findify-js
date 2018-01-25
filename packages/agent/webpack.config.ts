import * as path from 'path';
import * as webpack from 'webpack';
import * as GitRevisionPlugin from 'git-revision-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';

interface WebpackEnvArgs {
  analyze?: boolean;
  generateStatsFile?: boolean;
}

export default (env: WebpackEnvArgs) => {
  const config: webpack.Configuration = {
    context: path.resolve(__dirname, 'src'),
    entry: {
      'findify-agent': './index',
      'findify-agent.min': './index',
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      // we target a UMD and name it FindifySDK
      // when including the bundle in the browser
      // it will be accessible at `window.FindifySDK`
      libraryTarget: 'umd',
      library: 'FindifyAgent',
      // will name the AMD module of the UMD build,
      // otherwise an anonymous define is used
      umdNamedDefine: true,
    },
    devtool: 'source-map',
    stats: 'minimal',
    bail: true,
    resolve: { extensions: ['.ts', '.js'] },
    module: {
      rules: [
        {
          test: /\.ts$/,
          loader: 'ts-loader',
          include: path.resolve(__dirname, 'src'),
          options: {
            silent: true,
            configFile: path.resolve(__dirname, 'tsconfig.lib.json'),
            compilerOptions: { target: 'es5' },
          },
        },
      ],
    },
    plugins: [
      new webpack.DefinePlugin({
        __COMMITHASH__: JSON.stringify(new GitRevisionPlugin().commithash()),
        'process.env': { NODE_ENV: JSON.stringify('production') },
      }),
      // enable scope hoisting
      new webpack.optimize.ModuleConcatenationPlugin(),
      new webpack.optimize.UglifyJsPlugin({
        // activate sourceMaps in UglifyJsPlugin since they are disabled by default
        // use source maps to map error message locations to modules
        sourceMap: true,
        // apply minification only on the second bundle by
        // using a RegEx on the name, which must end with `.min.js`
        include: /\.min\.js$/,
      }),
    ],
  };

  if (Boolean(env && env.analyze)) {
    const analyzerPlugin = new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerPort: 8888,
      openAnalyzer: true,
      generateStatsFile: Boolean(env.generateStatsFile),
      reportFilename: 'stats/webpack.stats.html',
      statsFilename: 'stats/webpack.stats.json',
    });
    config.plugins!.push(analyzerPlugin);
  }

  return config;
};
