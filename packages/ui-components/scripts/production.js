import path from 'path';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import webpack from 'webpack';
import Sprite from 'svg-sprite-loader/plugin';
import UglifyJSPlugin from 'uglifyjs-webpack-plugin';

const extractGlobal = new ExtractTextPlugin('styles.css');
const extractCustom = new ExtractTextPlugin('custom.css');


export default (env, { module, plugins, output, ...config }) => ({
  ...config,
  entry: {
    'findify-ui-components': path.resolve(process.cwd(), 'src/index.ts'),
    'findify-ui-components.min': path.resolve(process.cwd(), 'src/index.ts'),
  },
  output: {
    ...output,
    library: 'FindifyUIComponents',
    libraryTarget: 'umd',
    umdNamedDefine: true,
  },

  stats: 'normal',

  module: {
    ...module,
    rules: [
      module.rules.font,
      module.rules.image,
      module.rules.svg,
      {
        ...module.rules.localCSS,
        use: extractGlobal.extract({
          fallback: 'style-loader',
          use: module.rules.localCSS.use.filter((_, i) => !!i),
        }),
      },
      {
        ...module.rules.globalCSS,
        use: extractGlobal.extract({
          fallback: 'style-loader',
          use: module.rules.globalCSS.use.filter((_, i) => !!i),
        }),
      },
      {
        ...module.rules.customCSS,
        use: extractCustom.extract({
          fallback: 'style-loader',
          use: module.rules.customCSS.use[1],
        }),
      },
      {
        ...module.rules.ts,
        include: [
          path.resolve(process.cwd(), 'src'),
          path.resolve(process.cwd(), 'dev'),
          path.resolve(process.cwd(), 'node_modules'),
        ],
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                ["lodash", { "id": ["lodash", "recompose", "ramda"] }],
                "@babel/plugin-syntax-dynamic-import",
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-react-constant-elements",
                "@babel/plugin-syntax-object-rest-spread"
              ],
              presets: [
                "@babel/preset-typescript",
                "@babel/preset-react",
                ["@babel/preset-env", {
                  "modules": false,
                  "targets": { "browsers": ["last 2 versions", "ie > 8"] },
                }]
              ]
            }
          },
        ],
      },
    ],
  },
  plugins: [
    ...plugins,
    extractGlobal,
    extractCustom,
    new Sprite(),

    new UglifyJSPlugin({
      test: /\.min\.js($|\?)/i,
      cache: true,
      parallel: true,
      sourceMap: true,
      uglifyOptions: {
        output: {
          comments: false
        },
        compress: {
          warnings: false,
          drop_debugger: true,
          drop_console: true
        }
      }
    }),

    // new OptimizeCssAssetsPlugin({
    //   cssProcessor: require('cssnano'),
    //   cssProcessorOptions: {
    //     autoprefixer: false,
    //     discardDuplicates: true,
    //     discardUnused: true,
    //     mergeRules: true,
    //     mergeLonghand: true,
    //     minifyFontValues: true,
    //     minifyGradients: true,
    //     discardComments: {
    //       removeAll: true
    //     }
    //   },
    //   canPrint: true
    // }),
    new webpack.LoaderOptionsPlugin({
      debug: false,
      minimize: true,
    }),
  ],
});
