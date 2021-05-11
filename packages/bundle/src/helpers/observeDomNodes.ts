const selectorMatches = (el, selector) => {
  try {
    var p = Element.prototype;
    var f =
      p.matches ||
      p.webkitMatchesSelector ||
      p.mozMatchesSelector ||
      p.msMatchesSelector ||
      function (s) {
        return [].indexOf.call(document.querySelectorAll(s), this) !== -1;
      };
    return f.call(el, selector);
  } catch (e) {}
};

const findSelector = (node, selectors) =>
  Object.keys(selectors).find((selector) => !!selectorMatches(node, selector));

const pickNodes = (nodes, selectors) =>
  [...nodes]
    .map((node) => {
      if (node?.dataset?.findify) return [node];
      const matchedSelector = findSelector(node, selectors);
      if (!matchedSelector) return;
      return [nodes, selectors[matchedSelector]];
    })
    .filter((i) => !!i);

export const observeDomNodes = (selectors = {}) => {
  if (!('MutationObserver' in window)) return;

  const callback = (mutations) => {
    for (let mutation of mutations) {
      if (mutation.type !== 'childList') return;
      if (!!mutation.addedNodes && !!mutation.addedNodes.length) {
        pickNodes(mutation.addedNodes, selectors).forEach(([node, type]) =>
          __root.widgets.attach(node[0], type)
        );
      }
      if (!!mutation.removedNodes && !!mutation.removedNodes.length) {
        pickNodes(mutation.removedNodes, selectors).forEach(([node]) => {
          const existWidget = __root.widgets
            .list()
            .find((w) => w.node === node[0]);
          if (!!existWidget) __root.widgets.detach(existWidget.key);
        });
      }
    }
  };

  const observer = new MutationObserver(callback);
  observer.observe(document, { childList: true, subtree: true });
};
