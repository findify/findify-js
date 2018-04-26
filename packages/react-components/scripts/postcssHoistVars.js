const postcss = require("postcss");
const path = require("path");
const fs = require("fs");

const includes = new Map();
const cachesIncludes = (filePath) => {
  if (includes.get(filePath)) return includes.get(filePath);
  const content = fs.readFileSync(filePath, "utf8");
  includes.set(filePath, content);
  return content;
}

const sanitize = value => value.startsWith("$") ? value.substr(1) : value;
const format = (...classNames) => ["-", ...classNames.map(sanitize)].join("-").toLowerCase();
const normalizeName = (pathName, contentBase) => {
  const relative = path.relative(contentBase + '/src', pathName);
  return relative.substring(0, relative.lastIndexOf('/')).replace(/\//g, '-');
}

const getValue = (value, parent, variables) =>
  value.replace(/\$(([\w\d-_])+)/g, (name) =>
    `var(${variables.get(parent + name) ||
    variables.get(name) ||
    '--' + name.substr(1)
    })`
  );

module.exports = postcss.plugin("postcss-hoist-vars", () => root => {
  const cache = [];
  root.prepend(":root{}");

  root.walk(node => {
    if (node.parent.selector !== ":root") return;
    if (cache.includes(node.prop)) return node.remove();
    cache.push(node.prop);
    root.nodes[0].append(node);
  });
});
