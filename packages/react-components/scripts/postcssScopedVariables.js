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

module.exports = postcss.plugin("postcss-reverse-props", ({ contentBase, include }) => root => {
  const baseClassName = normalizeName(root.source.input.file, contentBase);
  const variables = new Map();
  if (include) include.forEach(filePath => root.prepend(cachesIncludes(filePath)));
  if (!root.nodes[0] || root.nodes[0].selector !== ":root") root.prepend(":root{}");

  root.walk(node => {
    if (node.type !== "decl" || node.parent.selector === ":root") return;
    const parentType = node.parent.type;

    const parentSelector = node.parent.selector && node.parent.selector.substr(1);
    const { prop, value } = node;

    if (parentType === "root") {
      const variable = format(baseClassName, node.prop);
      variables.set(prop, variable);
      node.prop = variable;
    } else if (prop.startsWith("$")) {
      const variable = format(baseClassName, parentSelector, prop);
      variables.set(parentSelector + prop, variable)
      node.prop = variable;

      if (value.includes("$")) {
        node.value = getValue(value, parentSelector, variables);
      }
  
    } else if (value.includes("$")) {
      node.value = getValue(value, parentSelector, variables);
    }
    
    if (node.prop.startsWith("--")) {
      root.nodes[0].append({ text: `${node.prop}: ${node.value}`})
      root.nodes[0].append(node);
    };
  });
});
