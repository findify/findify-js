import { once } from 'lodash';

const createCssNode = css => {
  let node;
  if (/^(http|https|\/)/i.test(css)) {
    node = document.createElement('link');
    node.rel = 'stylesheet';
    node.href = css;
    return node;
  } else {
    node = document.createElement('style');
    if (node.styleSheet && !node.sheet) {
      node.styleSheet.cssText = css;
    } else {
      node.appendChild(document.createTextNode(css));
    }
    return node;
  }
};

const createJsNode = script => {
  const node = document.createElement('script');
  node.type = 'text/javascript';
  if (/^(http|https|\/)/i.test(script)) {
    node.src = script;
  } else {
    node.appendChild(document.createTextNode(script));
  }
  return node;
};

const createCssTag = css =>
  /^(http|https|\/)/i.test(css)
    ? `<link rel="stylesheet" href="${css}" />`
    : `<style>${css}</style>`;

const createScriptTag = script =>
  /^(http|https|\/)/i.test(script)
    ? `<script type="text/javascript" src="${script}"></script>`
    : `<script type="text/javascript">${script}</script>`;

export const injectTags = once((css = [], js = []) => {
  const head = document.getElementsByTagName('head')[0];
  const tags = [...css.map(createCssNode), ...js.map(createJsNode)];

  tags.forEach(tag => head.appendChild(tag));
});

export const createFrameHtml = (
  styles = [],
  scripts = [],
  type,
  floatAutocomplete,
) => `
  <!DOCTYPE html>
  <html class="findify-component-root">
    <head>
      <meta name="viewport" content="width=device-width, initial-scale=1">
      ${styles.map(createCssTag).join('')}
      ${(type === 'autocomplete' &&
        floatAutocomplete &&
        '<style>.frame-content{float: left;}</style>') ||
        ''}
    </head>
    <body>
      <div id='root'></div>
    </body>
    ${scripts.map(createScriptTag).join('')}
  </html>
`;
