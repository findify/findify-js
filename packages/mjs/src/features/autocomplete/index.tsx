import * as React from 'react';
import createFeature from '../../helpers/createFeature';
import watchNode from '../../decorators/watchNode';
import watchClickOutside from '../../decorators/watchClickOutside';
import renderForProps from '../../decorators/renderForProps';
import withFrame from '../../decorators/withFrame';
import provideHooks from '../../decorators/provideHooks';
import load from '../../decorators/loadUIComponents';
import { isObject } from 'lodash';

import {
  compose,
  withState,
  flattenProp,
  renameProp,
  onlyUpdateForKeys,
  withHandlers,
  branch,
  lifecycle,
  renderNothing,
  withPropsOnChange,
} from 'recompose';

import provider from './provider';
import stylesMapper from './stylesMapper';
import desktopComponent from './desktopComponent';
import mobileComponent from './mobileComponent';

const empty = {};

const component = compose(
  renderForProps(['visible']),
  branch(
    ({ isMobile, response, config }) =>
      (!isMobile || config.isMobileSimple) && !response,
    renderNothing,
  ),
  withPropsOnChange(
    ['config', 'styles'],
    ({ isMobile, node, styles, config }) => {
      if (isMobile && !config.isMobileSimple) return empty;
      const offset =
        node.position.get('left') + node.position.get('width') + styles.width;
      if (config.position === 'right' || offset < window.innerWidth)
        return empty;
      return { config: { ...config, position: 'right' } };
    },
  ),
  onlyUpdateForKeys([
    'value',
    'response',
    'selectedSuggestion',
    'isMobile',
    'config',
  ]),
  flattenProp('response'),
  provideHooks('autocomplete'),
)(load('Autocomplete'));

export default createFeature({
  component,
  provider,
})(
  withState('visible', 'setVisible', false),
  withHandlers({
    onSearchSuggestionClick: ({
      node,
      trackEvent,
      location,
      response,
      provider,
      setVisible,
    }) => async ({ value, redirect }) => {
      const request = { suggestion: value };

      if (location.isSearchPage) {
        trackEvent('click-suggestion', request);
      } else {
        trackEvent('click-suggestion', request, true);
      }

      if (redirect) {
        await trackEvent('redirect', request);
        return location.navigate(redirect.url);
      }

      node.instance.value = value;
      provider.request(value);
      setVisible(false);
      return location.searchFor(value);
    },

    onProductClick: ({ location, trackEvent, response }) => product => {
      trackEvent('click-item', { item_id: product.id });
      return location.navigate(product.product_url);
    },
  }),
  branch(
    ({ isMobile, config, visible }) => isMobile && !config.isMobileSimple,
    mobileComponent,
    desktopComponent,
  ),
  withFrame(stylesMapper),
);
