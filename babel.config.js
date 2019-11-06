
module.exports = (api) => {
  api.cache(false);
  return {
    "plugins": [
      "@babel/plugin-proposal-object-rest-spread",
      "@babel/plugin-proposal-class-properties",
      "@babel/plugin-syntax-object-rest-spread"
    ],
    "presets": [
      "@babel/preset-typescript",
      ["@babel/preset-env", {
        "modules": false,
        "useBuiltIns": "entry",
        "corejs": { "version": 3, "proposals": true },
        "targets": {
          // browserlist combined by OR clause
          // https://github.com/ai/browserslist
          "browsers": ["last 2 versions", " ie >= 10"],
        },
      }]
    ]
  }
}
