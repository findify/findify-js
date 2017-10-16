import * as React from 'react';
import {
  compose,
  mapProps,
  setDisplayName,
  defaultProps,
  createEagerElement,
  withPropsOnChange,
} from 'recompose';
import withConfig from 'helpers/withConfig';
import { Product } from 'widgets/Product';
import { Grid } from 'widgets/Grid';
import withHooks from 'helpers/withHooks';
import sizeMe from 'react-sizeme';

const styles = require('./styles.css');

const getProductKey = product =>
  product.position
    ? [product.hash || product.id, product.position].join('_')
    : product.hash || product.id;

const countColumns = width => {
  if (width > 1900) return 8;
  if (width > 1100) return 6;
  if (width > 700) return 4;
  if (width > 400) return 3;
  return 2;
};

const HOC = compose(
  setDisplayName('ProductsList'),
  sizeMe({ refreshRate: 100, refreshMode: 'debounce' }),
  withPropsOnChange(['size'], ({ size }) => ({
    columns: countColumns(size.width),
  })),
  withHooks('products'),
  withHooks('grid')
);

export const Component = ({
  items,
  className,
  columnClass,
  onProductClick,
  config,
  columns,
}: any) => (
  <div className={styles.root}>
    {config.title && <h4 className={styles.title}>{config.title}</h4>}
    <Grid columns={String(12 / columns)} className={className}>
      {items.map((product, i) =>
        createEagerElement(Product, {
          ...product,
          key: getProductKey(product),
          index: i,
          config: {
            ...config.product,
            stickers: config.stickers,
            currency: config.currency,
          },
          columnClass: columnClass,
          onProductClick,
        })
      )}
    </Grid>
  </div>
);

export const ProductsList: any = HOC(Component);

type ProductsListType = {
  columns: string | number;
  onProductClick: void;
  items: any[];
};
