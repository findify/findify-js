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
    context: path.resolve(process.cwd(), 'src'),

    entry: {
      'bundle': ['./index'],
    },

    output: {
      filename: '[name].js',
      chunkFilename: '[name].js',
      publicPath: '/',
      path: path.resolve(__dirname, 'dist'),
    },

    devServer: {
      contentBase: path.resolve(process.cwd(), 'dist'),
      port: 3000,
      stats: 'minimal',
      historyApiFallback: true,
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
                  "@babel/plugin-syntax-dynamic-import"
                ],
                presets: [
                  "@babel/preset-typescript",
                  ["@babel/preset-env", {
                    "modules": false,
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
        'process.env': {
          NODE_ENV: JSON.stringify('production'),
          BROWSER: true
        },
      }),


      // enable scope hoisting
      new webpack.optimize.ModuleConcatenationPlugin(),


      new webpack.optimize.CommonsChunkPlugin({
        async: 'common',
        minChunks(module, count) {
          return module.context
          && module.context.includes("node_modules")
          && !module.context.includes('@findify')
          && count >= 2;
        },
      }),

      new webpack.LoaderOptionsPlugin({
        debug: false,
        minimize: true
      }),
  
      // new DuplicatePackageCheckerPlugin(),
  
      // new UglifyJSPlugin({
      //   test: /\.js($|\?)/i,
      //   cache: true,
      //   parallel: true,
      //   sourceMap: true,
      //   uglifyOptions: {
      //     output: {
      //       beautify: false,
      //     },
      //     compress: {
      //       drop_debugger: true,
      //     }
      //   }
      // }),

    //   new CompressionPlugin({
    //     exclude: /\.map/,
    //   })

      new HtmlWebpackPlugin({
        hash: true,
        template:  path.resolve(__dirname, 'index.html'),
        inject: false
      }),

      new webpack.HashedModuleIdsPlugin()
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
