import * as React from 'react';
import createFeature from '../../helpers/createFeature';
import renderForProps from '../../decorators/renderForProps';
import withFrame from '../../decorators/withFrame';
import withWrapper from '../../decorators/withWrapper';
import provideHooks from '../../decorators/provideHooks';
import watchNode from '../../decorators/watchNode';
import load from '../../decorators/loadUIComponents';

import {
  compose,
  withState,
  flattenProp,
  renameProp,
  onlyUpdateForKeys,
  withHandlers,
  branch,
  renderComponent,
  renderNothing,
  withProps,
} from 'recompose';

import wrapper from './wrapper';
import provider from './provider';
import stylesMapper from './stylesMapper';

const component = compose(
  onlyUpdateForKeys(['response', 'config']),
  renderForProps(['response']),
  flattenProp('response'),
  provideHooks('recommendations'),
  withProps(({ config: { limit }, items }) => ({
    items:
      limit && limit < items.length ? items.filter((_, i) => i < limit) : items,
  })),
  withWrapper(wrapper),
  branch(
    ({ config }) => config.template === 'grid',
    renderComponent(load('ProductsList')),
    renderComponent(load('ProductsCarousel'))
  )
)(null);

export default createFeature({
  appendTo: 'self',
  provider,
  component,
})(
  withHandlers({
    onProductClick: ({ location, trackEvent, response }) => (
      product,
      openInNewWindow
    ) => {
      trackEvent('click-item', { item_id: product.id }, !openInNewWindow);
      return location.navigate(
        product.product_url,
        openInNewWindow ? '_blank' : '_self'
      );
    },
  }),

  watchNode({ position: null }),

  branch(
    ({ response, config }) =>
      response && response.items.length < config.minResultsToShow,
    renderNothing
  ),

  withFrame(stylesMapper)
);
