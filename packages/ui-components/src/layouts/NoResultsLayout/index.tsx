import * as React from 'react';
import { compose, withPropsOnChange } from 'recompose';
import { ProductsList } from 'lists/ProductsList';
import template from 'helpers/template';
import withHooks from 'helpers/withHooks';
import { escape } from 'lodash';

const styles = require('./styles.css');

const HOC = compose(
  withPropsOnChange(['config', 'query'], ({ config, query }) => ({
    title: config.i18n.noResult.replace(
      '<span class="findify-query"></span>',
      `<strong>${escape(query)}</strong>`,
    ),
  })),
  withHooks('noResults'),
);

const Component: any = ({ items, title, onProductClick, config }) => (
  <div className={styles.root}>
    <p className={styles.title} dangerouslySetInnerHTML={{ __html: title }} />
    <ProductsList
      config={config}
      items={items}
      onProductClick={onProductClick}
    />
  </div>
);

export const NoResultsLayout: any = HOC(Component);
