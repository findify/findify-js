import path from 'path';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import webpack from 'webpack';
import Sprite from 'svg-sprite-loader/plugin';

const extractGlobal = new ExtractTextPlugin('styles.css');
const extractCustom = new ExtractTextPlugin('custom.css');

export default (env, { module, plugins, output, ...config }) => ({
  ...config,
  entry: path.resolve(process.cwd(), 'src/index.ts'),

  output: {
    ...output,
    library: 'FindifyUIComponents',
    libraryTarget: 'commonjs2',
  },

  externals: [
    nodeExternals({
      modulesFromFile: true,
    }),
  ],

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
        use: [
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                'lodash',
                'transform-object-rest-spread',
                'babel-plugin-transform-class-properties',
                'transform-react-constant-elements',
                'transform-react-inline-elements',
                'transform-react-remove-prop-types',
                'transform-react-pure-class-to-function',
              ],
              presets: [
                [
                  'env',
                  {
                    modules: false,
                    targets: { browsers: ['last 2 versions', 'ie > 8'] },
                  },
                ],
                'react',
              ],
            },
          },
          {
            loader: 'ts-loader',
            options: {
              transpileOnly: true,
            },
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
