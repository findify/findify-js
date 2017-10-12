import * as React from 'react';
import {
  branch,
  compose,
  mapProps,
  pure,
  renderNothing,
  withHandlers,
} from 'recompose';
import { Rating } from 'widgets/Rating';
import { getPrice } from 'helpers/getPrice';
import { format as currencyFormat } from 'currency-formatter';
import { ProductsList } from 'lists/ProductsList';
import withHooks from 'helpers/withHooks';
const styles = require('./styles.css');

export const ProductMatches = compose(
  branch(({ items }) => !items || !items.length, renderNothing)
)(({ items, title, config, onProductClick }: Props) => (
  <div className={styles.wrap}>
    {title && (
      <div className={styles.title}>
        <span className={styles.searchSuggestionsTitle}>{title}</span>
      </div>
    )}
    <ProductsList
      columns={2}
      items={items}
      config={config}
      onProductClick={onProductClick}
      className={styles.items}
    />
  </div>
));

type Props = {
  items?: Product[];
  title?: string;
  config: {
    columns: number;
    currency: {
      code?: string;
    };
    product: any;
  };
  onProductClick?: () => void;
};

type Product = {
  id: any;
  productUrl: string;
  thumbnailUrl: string;
  title: string;
  price: string;
  compareAt?: number;
  reviewsCount?: number;
  rating?: number;
  // rating?: 1 | 1.5 | 2 | 2.5 | 3 | 3.5 | 4 | 4.5 | 5,
};
