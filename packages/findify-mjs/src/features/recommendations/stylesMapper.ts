const empty = {};

export default ({ node, styles, config }) =>
  (config.frameDisabled && empty) || {
    position: 'relative',
    width: styles.width || '100%',
    height: styles.height || '100%',
    border: 'none',
  };
