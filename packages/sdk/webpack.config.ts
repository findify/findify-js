import * as path from 'path';
import * as webpack from 'webpack';
import * as GitRevisionPlugin from 'git-revision-webpack-plugin';
import { BundleAnalyzerPlugin } from 'webpack-bundle-analyzer';
import * as TerserPlugin from 'terser-webpack-plugin';

interface WebpackEnvArgs {
  analyze?: boolean;
  generateStatsFile?: boolean;
}

export default (env: WebpackEnvArgs) => {
  const config: webpack.Configuration = {
    entry: {
      'findify-sdk': path.resolve(__dirname, 'src/index'),
    },
    output: {
      filename: '[name].js',
      path: path.resolve(__dirname, 'dist'),
      // we target a UMD and name it FindifySDK
      // when including the bundle in the browser
      // it will be accessible at `window.FindifySDK`
      libraryTarget: 'umd',
      library: 'FindifySDK',
      // will name the AMD module of the UMD build,
      // otherwise an anonymous define is used
      umdNamedDefine: true,
    },
    stats: 'minimal',
    bail: true,
    target: ['web', 'es5'],
    resolve: {
      extensions: ['.ts', '.js'],
      symlinks: false,
    },
    optimization: {
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
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
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
                    "corejs": 3,
                    "useBuiltIns": "usage",
                    "targets": { "browsers": ["last 2 versions", "ie >= 10"] },
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
          FINDIFY_ENV: JSON.stringify('production')
        },
      }),
      // enable scope hoisting
      new webpack.optimize.ModuleConcatenationPlugin(),
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
