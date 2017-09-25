import { hasModifier } from 'tslint/lib';
import * as React from 'react';
import * as cx from 'classnames';
import { compose, pure, mapProps } from 'recompose';
import Icon from 'internals/Icon';

const styles = require('./styles.css');

const itemsArray = [...Array(5).keys()];

const Start: any = mapProps(({ diff }: any) => ({
  iconClass: diff === 0.5 ? 'half' : diff < 0 ? 'full' : 'empty',
}))(({ iconClass }: any) => (
  <Icon name={`star-${iconClass}`} className={cx(styles.star)} />
));

export const Rating = ({ value, count }: Props) => (
  <div className={styles.wrap}>
    <div className={styles.stars}>
      {itemsArray.map((item: number) => (
        <Start key={item} diff={item - value} />
      ))}
    </div>
    {!!count && <span className={styles.count}>({count})</span>}
  </div>
);

type Props = {
  value: number;
  // value: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
  count?: number;
};
