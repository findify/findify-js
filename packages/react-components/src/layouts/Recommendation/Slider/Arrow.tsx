import React from 'react';
import { compose, withHandlers, mapProps } from 'recompose';
import { omit } from 'lodash/fp';

import styles from './styles.css';

const Arrow = compose(
  withHandlers({
    onClick: ({ onClick, defaultOnClick }) => () => onClick ? onClick() : defaultOnClick(),
  }),
  mapProps(omit(['slideCount', 'currentSlide', 'defaultOnClick']))
)(({ dir, ...props }: any) => (
  <button {...props} name={`chevron-${dir}`} className={styles.arrow} />
));

export const renderArrow = (dir, handler) => <Arrow dir={dir} defaultOnClick={handler} />;
