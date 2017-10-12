import * as React from 'react';
import { withHandlers } from 'recompose';
import * as cx from 'classnames';

const styles = require('./styles.css');

export interface OwnProps {
  className?: string;
  onClick(args: OnClickArgs): void;
}

export interface OnClickArgs {
  href: string;
  target: string;
}

export interface Handlers {
  onClick?: React.MouseEventHandler<HTMLDivElement>;
}

export type Props = OwnProps & Handlers;

const href =
  'http://findify.io/?utm_source=findify-demo-store.myshopify.com&utm_medium=banner&utm_campaign=Powered%20By%20Findify';

export const PoweredBy = withHandlers<OwnProps, Handlers>({
  onClick: ({ onClick }: Props) => e => {
    onClick({ href, target: '_blank' });
  },
})(({ onClick, className }: Props) => (
  <div onClick={onClick} className={cx(styles.root, className)}>
    Search powered by Findify
  </div>
));
