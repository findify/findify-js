import React from 'react';
import { compose, withHandlers, mapProps } from 'recompose';
import omit from 'helpers/omit';
import Button from 'components/Button';
import Icon from 'components/Icon';
import cx from 'classnames';
import styles from './styles.css';

const Arrow = compose<any, any>(
  withHandlers({
    onClick: ({ onClick, defaultOnClick }) => () => onClick ? onClick() : defaultOnClick(),
  }),
  mapProps(omit(['slideCount', 'currentSlide', 'defaultOnClick']))
)(({ dir, ...props }: any) => (
  <Button {...props} className={cx(props.className, styles.arrow)}>
    <Icon name={dir === 'left' ? 'ArrowLeftBig' : 'ArrowRightBig'} />
  </Button>
));

export const renderArrow = (dir, handler) => <Arrow dir={dir} defaultOnClick={handler} />;
