
module.exports = (api) => {
  api.cache(false);
  return {
    "plugins": [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-syntax-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-dynamic-import",
      ["@babel/plugin-transform-runtime",
        {
          absoluteRuntime: true
        }
      ],
    ],
    "sourceType": "unambiguous",
    "presets": [
      "@babel/preset-typescript",
      ["@babel/preset-env", {
        "modules": false,
        "useBuiltIns": "entry",
        'corejs': '3',
        "targets": {
          "browsers": ["last 2 versions", " ie >= 10"],
        },
      }]
    ]
  }
}
