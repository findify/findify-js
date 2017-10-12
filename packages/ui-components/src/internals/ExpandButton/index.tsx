import * as React from 'react';
const styles = require('./styles.css');

export interface Props {
  label: string;
  expanded: boolean;
  className?: string;
  style?: React.CSSProperties;
  onClick: React.MouseEventHandler<HTMLButtonElement>;
}

const getIconText = ({ expanded }: Props) => (expanded && '-') || '+';

export const ExpandButton = (props: Props) => (
  <button className={styles.wrap} onClick={props.onClick}>
    <span className={styles.sign}>{getIconText(props)}</span>
    {props.label}
  </button>
);
