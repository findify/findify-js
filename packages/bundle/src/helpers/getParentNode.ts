export const getParentNode = ({ config, node, type }) => {
  const renderIn = config.get('renderIn');

  if (
    type === 'autocomplete' &&
    window.innerWidth < config.get('mobileBreakpoint', 700) &&
    config.get('mobileViewType') === 'sidebar'
  ) return document.body;
  if (renderIn === 'self' || !renderIn) return node;
  if (renderIn === 'body') return document.body;
  if (renderIn === 'parent') return node.parentElement;
}
