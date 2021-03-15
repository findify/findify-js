
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
    "presets": [
      "@babel/preset-typescript",
      ["@babel/preset-env", {
        "modules": false,
        "useBuiltIns": "usage",
        "corejs": 3,
      }]
    ]
  }
}
