import { Immutable } from '@findify/store-configuration';
import jump from 'jump.js';
import { debounce } from './debounce';

const nodes = new Map();

const registerNode = (string) => {
  const node = document.querySelector(string);
  nodes.set(string, node);
  return node;
};

export const scrollTo: any = debounce((selectorOrNode, offset = 0) => {
  if (!document) return;
  const node =
    selectorOrNode instanceof HTMLElement
      ? selectorOrNode
      : nodes.get(selectorOrNode) || registerNode(selectorOrNode);
  if (!node) return;
  const { top } = node.getBoundingClientRect();
  if (top > 0) return;
  return jump(node, { offset });
}, 200);

export const maybeScrollTop = (
  config: Immutable.SearchConfig,
  force = false
): void => {
  const hash = document?.location.hash.substring(1) || '';
  if (hash.length > 0) {
    return
  }

  const navigatedProductId = window.localStorage.getItem('findify-navigated-product-id')
  if (navigatedProductId) {
    return
  }

  if (force || (config.getIn(['scrollTop', 'enabled']) && config.getIn(['pagination', 'type']) !== 'lazy' && config.getIn(['pagination', 'type']) !== 'combined')) {
    scrollTo(
      config.getIn(['scrollTop', 'selector']) || config.get('node'),
      config.getIn(['scrollTop', 'offset'])
    );
  }
}
