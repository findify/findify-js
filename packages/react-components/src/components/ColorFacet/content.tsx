import React from 'react';
import color from 'tinycolor2';

const getStyles = (item, config) => {
  const value = item.get('value').toLowerCase();
  const background = config.getIn(['facets', 'color', 'mapping', value], value);
  return {
    ball: { background },
    check: { color: color(background).isDark() ? '#fff' : '#333' }
  }
};

export default ({ item, config }) => {
  const styles = getStyles(item, config);
  return <span style={styles.ball}/>
}
