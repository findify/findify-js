import * as React from 'react';
import { branch, compose, renderComponent, withHandlers } from 'recompose';
import Image from 'internals/Image';
import * as cx from 'classnames';

const styles = require('./styles.css');

export const Banner: any = compose(
  withHandlers({
    onImageClick: ({ onClick, ...rest }) => () => onClick && onClick(rest),
  }),
)(({ imageUrl, onImageClick, onClick, className }: any) => (
  <Image
    onClick={onImageClick}
    src={imageUrl}
    style={{ cursor: !!onClick ? 'pointer' : 'inherit' }}
    className={cx(styles.root, className)}
  />
));
