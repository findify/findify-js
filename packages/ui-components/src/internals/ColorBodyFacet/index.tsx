import * as React from 'react';
import { compose, withHandlers, withPropsOnChange, pure } from 'recompose';
import * as cx from 'classnames';
import * as color from 'tinycolor2';
import Icon from 'internals/Icon';
import sizeMe from 'react-sizeme';

const styles = require('./styles.css');

const Item = compose(
  pure,
  withPropsOnChange(['title'], ({ title, config: { mapping } }: any) => ({
    background: title !== 'Multicolor' && mapping[title.toLowerCase()],
    checkMarkStyles: { fill: color(title).isDark() ? '#fff' : '#333' },
  })),
  withHandlers({
    onClick: ({ onChange, selected, item }: any) => e => {
      if (e) e.preventDefault();
      return onChange({ ...item, selected: !item.selected });
    },
  })
)(({ title, background, item, onClick, checkMarkStyles }: any) => (
  <div className={styles.item}>
    <button
      className={cx(styles.ball, title === 'Multicolor' && 'multiply-gradient')}
      style={{ background }}
      onClick={onClick}
    >
      {item.selected && (
        <Icon
          name="check"
          style={checkMarkStyles}
          className={styles.checkMark}
        />
      )}
    </button>
    <div className={styles.tooltip}>{title}</div>
  </div>
));

export const ColorBodyFacet = compose(
  withPropsOnChange(['values'], ({ values, config: { mapping } }) => ({
    values: values.filter(
      ({ value }) => value === 'Multicolor' || !!mapping[value.toLowerCase()]
    ),
  }))
)(({ values, ...rest }: any) => (
  <div className={styles.root}>
    {values.map(item =>
      React.createElement(Item, {
        ...rest,
        key: item.value,
        title: item.value,
        item,
      })
    )}
  </div>
));
