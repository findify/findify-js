const path = require('path');
module.exports = {
  "extends": "../../.babelrc",
  "presets": [
    "@babel/preset-react",
  ],
  plugins: [
    "inline-react-svg",
    "babel-plugin-jsx-display-if",
    "react-hot-loader/babel",
    ["module-resolver", {
      "extensions": [".ts", ".tsx"],
      "root": [path.resolve(__dirname, "src")]
    }]
  ],
  "env": {
    "lib": {
      "plugins": [
        ["@findify/babel-plugin-css-modules-transform", {
          "camelCase": true,
          "resolve": {
            "modules": [path.resolve(__dirname, "src")]
          },
          "extractCss": "./lib/styles.css",
          "prepend": "./postcss.config.js",
          "generateScopedName": path.resolve(__dirname, "scripts/getLocalIdent.js")
        }]
      ]
    }
  }
}