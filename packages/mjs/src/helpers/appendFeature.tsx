import { render } from 'react-dom';
import { delay } from 'lodash';

import findClosestElement from './findClosestElement';
import registerHooks from './registerHooks';

const createDiv = (className?: string) => {
  const div = document.createElement('div');
  if (className) div.className = className;
  return div;
};

export const mutateDom = (node, appendTo) => {
  const reactRoot = createDiv('findify-root');

  if (appendTo === 'self') {
    node.innerHTML = '';
    node.appendChild(reactRoot);
  } else if (appendTo === 'parent') {
    const wrapper = createDiv('findify-component-wrapper');
    const nodeClone = node.cloneNode(true);
    const parent = node.parentNode;
    wrapper.appendChild(node);
    wrapper.appendChild(reactRoot);
    parent.append(wrapper);
  } else {
    const wrapper = document.getElementsByTagName('body')[0];
    wrapper.appendChild(reactRoot);
  }

  if (node.tagName === 'INPUT') {
    node.autocomplete = 'off';
    const form = findClosestElement('form')(node);
    if (form) form.removeAttribute('onsubmit');
  }

  return reactRoot;
};

export default analytics => ({ node, type, config, initialHTML }) => {
  let componentDOMRoot;
  const featureCreator = require(`../features/${type}/index.tsx`).default;

  registerHooks({ type, config }, (config, hooks) => {
    const { appendTo, Component } = featureCreator({
      type,
      node,
      config,
      hooks,
      analytics,
      initialHTML,
    });

    componentDOMRoot =
      componentDOMRoot || mutateDom(node, config.appendTo || appendTo);
    render(Component, componentDOMRoot);
  });
};