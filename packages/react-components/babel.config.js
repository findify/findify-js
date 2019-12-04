const path = require('path');

module.exports = (api) => {
  let plugins = [
    "inline-react-svg",
    "babel-plugin-jsx-display-if",
    ["module-resolver", {
      "extensions": [".ts", ".tsx"],
      "root": [path.resolve(__dirname, "src")]
    }],
  ];
  if (api.env("lib")) {
    plugins.push(["@findify/babel-plugin-css-modules-transform", {
      "camelCase": true,
      "resolve": {
        "modules": [path.resolve(__dirname, "src")]
      },
      "extractCss": "./lib/raw.css",
      "prepend": "./postcss.config.js",
      "generateScopedName": path.resolve(__dirname, "scripts/getLocalIdent.js")
    }])
  }
  if (api.env("development")) {
    plugins.push("react-hot-loader/babel")
  }

  return {
    "extends": "../../babel.config.js",
    "presets": [
      "@babel/preset-react",
    ],
    plugins
  }
}
