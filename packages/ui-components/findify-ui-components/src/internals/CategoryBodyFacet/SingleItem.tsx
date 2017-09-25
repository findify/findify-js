import * as React from 'react';
import * as cx from 'classnames';

const styles = require('./styles.css');
const customStyles = require('customStyles');

export const SingleItem = ({
  title,
  count,
  onClick,
  selected,
  index,
  style,
}: any) => (
  <li
    style={style}
    onClick={onClick}
    className={cx(
      styles.item,
      customStyles.facetItem,
      selected && styles.selected,
      selected && customStyles.facetItemSelected,
    )}
  >
    <p className={styles.title}>{title}</p>
    <span className={styles.count}>({count})</span>
  </li>
);
