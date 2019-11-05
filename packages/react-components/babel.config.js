const path = require('path');

module.exports = (api) => {
  api.cache(false);
  return {
    "extends": "../../babel.config.js",
    "presets": [
      "@babel/preset-react",
    ],
    plugins: [
      "inline-react-svg",
      "babel-plugin-jsx-display-if",
      ["module-resolver", {
        "extensions": [".ts", ".tsx"],
        "root": [path.resolve(__dirname, "src")]
      }]
    ],
    "env": {
      "development": {
        "plugins": [
          "react-hot-loader/babel"
        ]
      },
      "lib": {
        "plugins": [
          ["@findify/babel-plugin-css-modules-transform", {
            "camelCase": true,
            "resolve": {
              "modules": [path.resolve(__dirname, "src")]
            },
            "extractCss": "./lib/raw.css",
            "prepend": "./postcss.config.js",
            "generateScopedName": path.resolve(__dirname, "scripts/getLocalIdent.js")
          }],
        ]
      }
    }
  }
}
