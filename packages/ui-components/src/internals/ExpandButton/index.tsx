import * as React from 'react';
const styles = require('./styles.css');

export const ExpandButton = ({ expanded, onClick, label }: any) => (
  <button className={styles.wrap} onClick={onClick}>
    <span className={styles.sign}>{(expanded && '-') || '+'}</span>
    {label}
  </button>
);
