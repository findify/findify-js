import { hasModifier } from 'tslint/lib';
import * as React from 'react';
import * as cx from 'classnames';
import { compose, pure, mapProps } from 'recompose';
import Icon from 'internals/Icon';

const styles = require('./styles.css');

const itemsArray = Array.from(Array(5).keys());

const getIconClass = (diff: number) => {
  if (diff === 0.5) {
    return 'half';
  }
  return diff < 0 ? 'full' : 'empty';
};

export const Rating = ({ value, count }: Props) => (
  <div className={styles.wrap}>
    <div className={styles.stars}>
      {itemsArray.map((idx: number) => (
        <Icon
          key={idx}
          name={`star-${getIconClass(idx - value)}`}
          className={cx(styles.star)}
        />
      ))}
    </div>
    {!!count && <span className={styles.count}>({count})</span>}
  </div>
);

interface Props {
  value: number;
  // value: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
  count?: number;
}
