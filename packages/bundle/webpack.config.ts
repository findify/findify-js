import * as path from 'path';
import * as webpack from 'webpack';
import * as GitRevisionPlugin from 'git-revision-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import * as DuplicatePackageCheckerPlugin from 'duplicate-package-checker-webpack-plugin';
import * as  CompressionPlugin from 'compression-webpack-plugin';
import * as  HtmlWebpackPlugin from 'html-webpack-plugin';

interface WebpackEnvArgs {
  analyze?: boolean;
  generateStatsFile?: boolean;
}

export default (env: WebpackEnvArgs) => {
  const config: webpack.Configuration = {
    entry: {
      'bundle': path.resolve(__dirname, 'src/index'),
      'polyfill': path.resolve(__dirname, 'src/polyfill'),
    },
    devtool: 'source-map',
    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
      contentBase: path.resolve(__dirname, 'dist'),
      port: 3000,
      stats: 'minimal',
      historyApiFallback: true,
    },
    stats: 'minimal',
    bail: true,
    resolve: {
      extensions: ['.ts', '.js'],
      alias: {
        debug: path.resolve(__dirname, '../../node_modules/debug')
      }
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
                  "@babel/plugin-syntax-dynamic-import",
                ],
                presets: [
                  "@babel/preset-typescript",
                  ["@babel/preset-env", {
                    "modules": false,
                    "useBuiltIns": 'entry',
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
        __root: 'window.findify',
        __COMMITHASH__: JSON.stringify(new GitRevisionPlugin().commithash()),
        'process.env': {
          BROWSER: true
        },
      }),
  
      new DuplicatePackageCheckerPlugin(),

      new HtmlWebpackPlugin({
        hash: true,
        template:  path.resolve(__dirname, 'index.html'),
        inject: false
      }),

      // new webpack.HashedModuleIdsPlugin()
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
