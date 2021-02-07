
module.exports = (api) => {
  api.cache(false);
  return {
    "plugins": [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-object-rest-spread",
      "@babel/plugin-transform-runtime"
    ],
    "sourceType": "unambiguous",
    "presets": [
      "@babel/preset-typescript",
      ["@babel/preset-env", {
        "modules": false,
        "useBuiltIns": "entry",
        'corejs': '3',
        "targets": {
          // browserlist combined by OR clause
          // https://github.com/ai/browserslist
          "browsers": ["last 2 versions", " ie >= 10"],
        },
      }]
    ]
  }
}
