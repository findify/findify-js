import * as React from 'react';
import { findDOMNode } from 'react-dom';
import createFeature from '../../helpers/createFeature';
import renderForProps from '../../decorators/renderForProps';
import withFrame from '../../decorators/withFrame';
import withPortal from '../../decorators/withPortal';
import withWrapper from '../../decorators/withWrapper';
import provideHooks from '../../decorators/provideHooks';
import connectProvider from '../../decorators/connectProvider';
import load from '../../decorators/loadUIComponents';

import {
  compose,
  withState,
  flattenProp,
  lifecycle,
  defaultProps,
  renameProp,
  onlyUpdateForKeys,
  withHandlers,
  createEagerElement,
  branch,
  renderComponent,
  renderNothing,
  withProps,
  withPropsOnChange,
} from 'recompose';

import provider from './provider';
import noResultsProvider from './noResultsProvider';
import * as stylesMapper from './stylesMapper';
import mobileFacetsWrapper from './mobileFacetsWrap';

const initialHTML = nodeType => ({ node, hooks, ...data }) => {
  const hook = hooks && hooks[`collection.fallback`];

  if (!!hook && nodeType === 'fallback') {
    const Component = lifecycle({
      componentDidMount() {
        if (!hook || !hook.didMount) return;
        hook.didMount({ node: findDOMNode(this), data });
      },
    })(() => <div dangerouslySetInnerHTML={{ __html: node[nodeType] }} />);
    return <Component />;
  }
  return <div dangerouslySetInnerHTML={{ __html: node[nodeType] }} />;
};

const component = compose(
  onlyUpdateForKeys(['response', 'isMobile', 'config', 'isLoading']),
  withPropsOnChange(['type'], ({ location, type }) => ({
    type: !!location.collection ? 'collection' : type,
  })),
  branch(
    ({ type }) => type === 'collection',
    provideHooks('collection'),
    provideHooks('search')
  )
)(load('ResultsLayout'));

const mobileFacetsComponent = compose(
  renderForProps(['response', 'mobileFacetsOpen']),
  onlyUpdateForKeys(['response', 'isMobile', 'mobileFacetsOpen', 'config']),
  withWrapper(mobileFacetsWrapper),
  withFrame(stylesMapper.mobile),
  provideHooks('mobile')
)(load('FacetsLayout'));

const noResultsComponent = compose(
  connectProvider(noResultsProvider),
  lifecycle({
    componentWillMount() {
      this.props.provider.request();
    },
  }),
  withHandlers({
    onProductClick: ({ location, trackEvent, response }) => product => {
      trackEvent('click-item', { item_id: product.id }, true);
      return location.navigate(product.product_url);
    },
  }),
  onlyUpdateForKeys(['response', 'isLoading']),
  renderForProps(['response']),
  withFrame(stylesMapper.desktop),
  flattenProp('response'),
  withProps(props => ({ query: props.location.state.q })),
  provideHooks('search')
)(load('NoResultsLayout'));

export default createFeature({
  appendTo: 'self',
  provider,
  component,
})(
  withState('mobileFacetsOpen', 'setMobileFacetsOpen', false),
  withHandlers({
    onClearAll: props => props.provider.onClearAll,
    onPageChange: props => props.provider.onPageChange,
    onSortChange: props => props.provider.onSortChange,
    onBreadCrumbRemove: props => props.provider.onBreadCrumbRemove,
    onLoadNext: props => props.provider.onLoadNext,
    onLoadPrev: props => props.provider.onLoadPrev,
    onMobileFacetsClose: props => () => props.setMobileFacetsOpen(false),
    onMobileFacetsOpen: props => () => props.setMobileFacetsOpen(true),
    onBannerClick: ({ location }) => ({ targetUrl }) =>
      location.navigate(targetUrl),
    onPoweredByClick: ({ location }) => ({ href }) =>
      location.navigate(href, '_blank'),
    onFacetsChange: props => data =>
      props.isMobile
        ? props.provider.onFacetsChange(data)
        : props.provider.onFacetChange(data),
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
  branch(({ location, node, inline, provider }) => {
    if (inline) return false;
    return (
      (!location.isSearchPage && !location.collection) || !!provider.hasError
    );
  }, renderComponent(initialHTML('fallback'))),
  branch(({ response }) => !response, renderComponent(initialHTML('html'))),
  branch(
    ({ response }) => response && !response.items.length,
    renderComponent(noResultsComponent)
  ),
  branch(
    ({ isMobile, ...rest }) => isMobile,
    withPortal(mobileFacetsComponent)
  ),
  withFrame(stylesMapper.desktop)
);
