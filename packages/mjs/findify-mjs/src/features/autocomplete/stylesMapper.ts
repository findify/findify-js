const hiddenStyles = {
  visibility: 'hidden',
  position: 'absolute',
  top: 0,
  zIndex: -1,
};

const defaults = {
  position: 'absolute',
  top: 0,
  left: '-10px',
  border: 'none',
  height: '100%',
  zIndex: 9999999,
};

const mobileStyles = {
  position: 'fixed',
  top: 0,
  right: 0,
  width: '70%',
  height: '100%',
  border: 'none',
};

const computeStyles = (position, componentWidth, node, inline) => {
  if (inline) return { top: position.get('height'), left: 0 };

  const offset =
    node.position.get('left') + node.position.get('width') + componentWidth;

  return {
    top: position.get('top') + position.get('height'),
    left:
      offset > window.innerWidth
        ? position.get('left') + position.get('width') - componentWidth || 0
        : position.get('left'),
  };
};

export default ({
  node,
  styles,
  response,
  isMobile,
  config,
  visible,
  inline,
}) => {
  if (isMobile && !config.isMobileSimple) return mobileStyles;
  if (!visible) return hiddenStyles;

  const position = node.get('position');
  const { width, height } = styles;

  const { top, left } = computeStyles(position, styles.width, node, inline);
  const transform = `translate(${left}px, ${top}px)`;

  return {
    ...defaults,
    width: inline || config.frameDisabled ? 'auto' : width || '100%',
    height: inline || config.frameDisabled ? 'auto' : height || '100%',
    visibility:
      !response || (response && !response.suggestions.length)
        ? 'hidden'
        : 'visible',
    transform,
    msTransform: transform,
    WebkitTransform: transform,
  };
};
