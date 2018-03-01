const attrSelector = 'data-findify';
const keySelector = 'data-key';

let index = 0;

const getNodes = selector => [].slice.call(document.querySelectorAll(selector));

const getEntity = (selector, _type?) => getNodes(selector).map(node => {
  const key = node.getAttribute(keySelector) || ++index;
  const type = _type || node.getAttribute(attrSelector);
  return { key, type, node };
})

export const createEntities = (selectors = []) => [
  ...getEntity(`[${attrSelector}]`),
  ...Object.keys(selectors).reduce((acc, selector) =>
    [...acc, ...getEntity(selector, selectors[selector])], []
  )
];
