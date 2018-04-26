
const getAutocompleteNode = (config, node) => {
  if (config.get('isMobileSimple')) return node.parentElement;
  if (window.innerWidth < (config.get('mobileBreakpoint') || 700)) return document.body;
  return node.parentElement;
};

export const getParentNode = ({ config, node, type }) => {
  const renderIn = config.get('renderIn');

  if (type === 'autocomplete') return getAutocompleteNode(config, node);
  if (renderIn === 'self' || !renderIn) return node;
  if (renderIn === 'body') return document.body;
  if (renderIn === 'parent') return node.parentElement;
}
