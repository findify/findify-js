import jump from 'jump.js';
import { debounce } from './debounce';

const nodes = new Map();

const registerNode = (string) => {
  const node = document.querySelector(string.split(' ').map(i => '.' + i).join(''));
  nodes.set(string, node);
  return node;
}

export const scrollTo: any = debounce((selector, offset = 0) => {
  if (!document) return;
  const node = nodes.get(selector) || registerNode(selector);
  if (!node) return;
  const { top } = node.getBoundingClientRect();
  if (top > 0) return;
  return jump(node, { offset });
}, 200);
