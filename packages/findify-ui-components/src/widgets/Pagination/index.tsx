import * as React from 'react';
import { range } from 'lodash';
import * as cx from 'classnames';
import {
  branch,
  compose,
  defaultProps,
  pure,
  setDisplayName,
  renderNothing,
  withHandlers,
  withProps,
} from 'recompose';
import withConfig from 'helpers/withConfig';

import { Button } from './Button';

const styles = require('./styles.css');

const getRange = ({ current, total, step }) => {
  const min = current - step;
  const max = current + step + 1;
  return range(min < 1 ? 1 : min, max > total ? total + 1 : max);
};

export const Pagination: any = compose(
  setDisplayName('Pagination'),
  withConfig({
    step: 2,
    i18n: {
      previous: 'previews',
      next: 'next',
    },
  }),
  withProps(({ current, total, visible, config: { step } }: any) => ({
    showFirst: current > step + 1,
    showLast: current < total - step,
    showFirstDots: current > step + 2,
    showLastDots: current < total - step - 1,
    showPrev: current > step,
    showNext: total - step > current,
    visiblePages: getRange({ current, total, step }),
  })),
  withHandlers({
    changePage: ({ onChange }: any) => page => onChange({ page }),
  }),
)(
  ({
    showFirst,
    showLast,
    showPrev,
    showNext,
    showFirstDots,
    showLastDots,
    visiblePages,
    current,
    total,
    style,
    config,
    className,
    ...rest,
  }: any) => (
    <div className={cx(styles.root, className)} style={style}>
      {showPrev && (
        <Button
          className={styles.prev}
          label={config.i18n.previous}
          prependIcon="chevron-left"
          page={current - 1}
          {...rest}
        />
      )}
      {showFirst && (
        <Button page={1} label={1} {...rest} className={styles.first} />
      )}
      {showFirstDots && <Button label="..." className={styles.disabled} />}
      {visiblePages.map(page => (
        <Button
          key={page}
          page={page}
          label={String(page)}
          active={current === page}
          {...rest}
        />
      ))}
      {showLastDots && <Button label="..." className={styles.disabled} />}
      {showLast && (
        <Button page={total} label={total} {...rest} className={styles.last} />
      )}
      {showNext && (
        <Button
          className={styles.next}
          label={config.i18n.next}
          page={current + 1}
          appendIcon="chevron-right"
          {...rest}
        />
      )}
    </div>
  ),
);
