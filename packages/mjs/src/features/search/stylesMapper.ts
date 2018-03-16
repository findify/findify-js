export const mobile = () => ({
  position: 'fixed',
  top: 0,
  left: 0,
  width: '70%',
  height: '100%',
  border: 'none',
  zIndex: 10,
});

export const desktop = ({ styles, config }) =>
  (config.frameDisabled && {
    position: 'relative',
  }) || {
    position: 'relative',
    width: '100%',
    height: styles.height || '100%',
    border: 'none',
  };
