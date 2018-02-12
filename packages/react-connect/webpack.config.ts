import * as path from 'path';
import * as webpack from 'webpack';
import * as GitRevisionPlugin from 'git-revision-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import * as DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import * as CompressionPlugin from 'compression-webpack-plugin';

interface WebpackEnvArgs {
  analyze?: boolean;
  generateStatsFile?: boolean;
}

export default (env: WebpackEnvArgs) => {
  const config: webpack.Configuration = {
    context: path.resolve(__dirname, 'src'),

    entry: {
      'findify-react-connect': './index',
      'findify-react-connect.min': './index',
    },

    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      // we target a UMD and name it FindifySDK
      // when including the bundle in the browser
      // it will be accessible at `window.FindifySDK`
      libraryTarget: 'umd',
      library: 'FindifyReactConnect',
      // will name the AMD module of the UMD build,
      // otherwise an anonymous define is used
      umdNamedDefine: true,
    },

    devtool: 'source-map',
    stats: 'minimal',
    bail: true,
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          include: path.resolve(__dirname, 'src'),
          use: [
            {
              loader: 'babel-loader',
              options: {
                babelrc: false,
                plugins: [
                  "@babel/plugin-proposal-object-rest-spread",
                  "@babel/plugin-proposal-class-properties",
                ],
                presets: [
                  "@babel/preset-typescript",
                  ["@babel/preset-env", {
                    "modules": false,
                    "useBuiltIns": false,
                    "targets": { "browsers": ["last 2 versions", "ie > 8"] },
                  }]
                ]
              }
            }
          ]
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

      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
      }),
  
      new DuplicatePackageCheckerPlugin(),
  
      new UglifyJSPlugin({
        test: /\.min\.js($|\?)/i,
        cache: true,
        parallel: true,
        sourceMap: true,
        uglifyOptions: {
          output: {
            beautify: false,
          },
          compress: {
            drop_debugger: true,
          }
        }
      }),

      new CompressionPlugin({
        exclude: /\.map/,
      })
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
