/**
 * @module layouts/Recommendation/Slider
 */

import React from 'react';
import { compose, withHandlers, mapProps } from 'recompose';
import omit from 'helpers/omit';
import Button from 'components/Button';
import Icon from 'components/Icon';
import cx from 'classnames';
import styles from 'layouts/Recommendation/Slider/styles.css';


/** Props that Arrow component accepts */
export interface IArrowProps {
  /** Arrow direction */
  dir: 'left' | 'right';
  /** onClick handler that is used if it is passed */
  onClick?: (evt) => null;
  /** default onClick handler which is used when no onClick is present */
  defaultOnClick: (evt) => null;
  /** Rest of the props that get passed to Button */
  [x: string]: any
}

/**
 * Component to render right or left arrows in a slider
 */
const Arrow = compose<any, any>(
  withHandlers({
    onClick: ({ onClick, defaultOnClick }) => () => onClick ? onClick() : defaultOnClick(),
  }),
  mapProps(omit(['slideCount', 'currentSlide', 'defaultOnClick']))
)(({ dir, ...props }: IArrowProps) => (
  <Button {...props} className={cx(props.className, styles.arrow)}>
    <Icon name={dir === 'left' ? 'ArrowLeftBig' : 'ArrowRightBig'} />
  </Button>
));

export const renderArrow = (dir, handler) => <Arrow dir={dir} defaultOnClick={handler} />;
