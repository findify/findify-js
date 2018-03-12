const path = require('path');
module.exports = {
  "extends": "../../.babelrc",
  "presets": [
    "@babel/preset-react"
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
          "generateScopedName": "./scripts/getLocalIdent.js"
        }]
      ]
    }
  }
}
