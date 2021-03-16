const path = require('path');

const componentsPath = p => path.resolve(__dirname, 'packages/react-components', p);

module.exports = (api) => {
  api.cache(true);

  return {
    "sourceType": "unambiguous",

    "plugins": [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-syntax-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-dynamic-import",
    ],
    presets: [
      "@babel/preset-typescript",
      ["@babel/preset-env", {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": 3,
      }]
    ],
    overrides: [
      {
        test: 'packages/bundle',
        plugins: [
          ["@babel/plugin-transform-runtime", { "absoluteRuntime": true }]
        ],
        presets: [
          ["@babel/preset-env", {
            "modules": false,
            "useBuiltIns": "entry",
            "corejs": 3
          }]
        ]
      },

      {
        test: 'packages/react-components',
        presets: [
          ['@babel/preset-react', { runtime: 'automatic'}],
        ],
        plugins: [
          'inline-react-svg',
          'babel-plugin-jsx-display-if',
          [
            'module-resolver',
            {
              extensions: ['.ts', '.tsx'],
              root: [componentsPath('src')],
            },
          ],
        ],
        env: {
          lib: {
            plugins: [
              ['@findify/babel-plugin-css-modules-transform',
                {
                  camelCase: true,
                  resolve: {
                    modules: [componentsPath('src')],
                  },
                  extractCss: componentsPath('lib/raw.css'),
                  prepend: componentsPath('postcss.config.js'),
                  generateScopedName: componentsPath('scripts/getLocalIdent.js'),
                },
              ]
            ]
          }
        }
      }
    ]
  }
}
