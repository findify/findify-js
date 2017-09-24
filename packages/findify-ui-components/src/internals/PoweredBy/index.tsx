import * as React from 'react';
import { withHandlers } from 'recompose';
import * as cx from 'classnames';
const styles = require('./styles.css');

const href =
  'http://findify.io/?utm_source=findify-demo-store.myshopify.com&utm_medium=banner&utm_campaign=Powered%20By%20Findify';

export const PoweredBy: any = withHandlers({
  onClick: ({ onClick }) => e => {
    onClick({ href, target: '_blank' });
  },
})(({ onClick, className }: any) => (
  <div onClick={onClick} className={cx(styles.root, className)}>
    Search powered by Findify
  </div>
));
