import * as React from 'react';
import * as DOM from 'react-dom-factories';
import { compose, withProps } from 'recompose';
import { memoize, isArray } from 'lodash';
import template from 'helpers/template';
const styles = require('./styles.css');

import * as cx from 'classnames';

const translateZ = 'translateY(-50%)';
const ignore = ['out-of-stock'];

const getPosition = memoize(position => {
  const [y, x] = position.split('-');
  const root: any = {};
  let container: any = {};

  if (y === 'center') {
    root.top = '50%';
    container = {
      WebkitTransform: translateZ,
      MsTransform: translateZ,
      transform: translateZ,
    };
  } else {
    root[y] = 0;
  }
  if (x === 'center') {
    container.width = '100%';
  } else {
    container.float = x;
  }
  return { root, container };
});

const getContent = memoize((value, templates) => {
  if (!isArray(value)) return templates.single;
  if (value.length === 1) return template(templates.single)(value[0]);
  return template(templates.multiple)(Math.max.apply(Math, value));
});

const getStyles = memoize(styles => {
  const normalizedStyles = {
    ...styles,
    fontFamily: styles.fontFamily && styles.fontFamily.replace(';', ''),
    fontSize: styles.fontSize + 'px',
  };
  return normalizedStyles;
});

const Sticker: any = compose(
  withProps(({ config, value }) => ({
    position: getPosition(config.position),
    content: getContent(value, config.template),
    style: getStyles(config.styles),
  }))
)(({ position, style, content, name }: any) => (
  <div className={cx(styles.root, `sticker-${name}`)} style={position.root}>
    <div className={styles.sticker} style={{ ...position.container, ...style }}>
      {content}
    </div>
  </div>
));

export const Stickers: any = ({ stickers, config }) => {
  return DOM.div(
    {},
    !!stickers &&
      Object.keys(stickers)
        .filter(i => stickers[i] && !!config[i] && !ignore.includes(i))
        .map(key =>
          React.createElement(Sticker, {
            key,
            name: key,
            value: stickers[key],
            config: config[key],
          })
        )
  );
};
