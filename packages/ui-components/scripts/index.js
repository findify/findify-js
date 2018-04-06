import path from 'path';
import webpack from 'webpack';
import { getLocalIdent } from './helpers/cssIndent.js';
import pkg from '../package.json';
import Sprite from 'svg-sprite-loader/plugin';

const environments = ['development', 'production', 'dll', 'css'];

const getEnvironment = env =>
  (env && environments.find(e => !!env[e])) ||
  process.env.NODE_ENV ||
  'development';

const defaultConfig = environment => ({
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.css'],
    modules: [path.resolve(process.cwd(), 'src'), 'node_modules'],
    alias: {
      customStyles: path.resolve(process.cwd(), 'src/styles.custom.css'),
    },
  },

  output: {
    path: path.resolve(process.cwd(), 'dist'),
    filename: '[name].js',
    publicPath: '/',
  },

  module: {
    noParse: /\.min\.js/,
    rules: {
      globalCSS: {
        test: /\.global\.css/,
        use: ['style-loader', 'css-loader', 'postcss-loader'],
      },

      customCSS: {
        test: /\.custom\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: '[hash:base64:5]',
            },
          },
          'postcss-loader',
        ],
      },

      localCSS: {
        test: /^((?!(global|custom)).)*\.css/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              camelCase: true,
              getLocalIdent,
            },
          },
          'postcss-loader',
        ],
      },

      ts: {
        test: /\.tsx?$/,
        include: [
          path.resolve(process.cwd(), 'src'),
          path.resolve(process.cwd(), 'dev'),
        ],
      },

      font: {
        test: /\.(eot|ttf|woff|woff2)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:base64:5].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },

      svg: {
        test: /\.(svg)$/,
        use: [
          'react-svg-loader',
          {
            loader: 'babel-loader',
            options: {
              babelrc: false,
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/plugin-proposal-class-properties",
                "@babel/plugin-transform-react-constant-elements",
                "@babel/plugin-syntax-object-rest-spread"
              ],
              presets: [
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

      image: {
        test: /\.(jpg|png|gif)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              name: '[hash:base64:5].[ext]',
            },
          },
          {
            loader: 'image-webpack-loader',
            options: {
              progressive: true,
              optimizationLevel: 7,
              interlaced: false,
              pngquant: {
                quality: '65-90',
                speed: 4,
              },
            },
          },
        ],
      },
    },
  },

  plugins: [
    new webpack.DefinePlugin({
      ...environments.reduce(
        (acc, key) => ({
          ...acc,
          [`__${key.toUpperCase()}__`]: environments[key],
        }),
        {}
      ),
      'process.env': {
        NODE_ENV: JSON.stringify(environment),
      },
    }),
  ],
});

export default env => {
  const environment = getEnvironment(env);
  const environmentConfig = require(`./${environment}.js`).default; // eslint-disable-line
  return environmentConfig(env, defaultConfig(environment));
};
