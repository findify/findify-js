const postcss = require("postcss");

module.exports = postcss.plugin("postcss-wrap", (opts = { skip: [] }) => root => {
  root.walkRules(rule => {
    rule.selectors = rule.selectors.map(selector =>
      opts.skip.find(s => selector.includes(s))
      ? selector
      : opts.wrap + ' ' + selector
    )
  });
});
