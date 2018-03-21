import { compose, setDisplayName, withStateHandlers, withPropsOnChange, pure } from 'recompose';
import withEvents from 'helpers/withEvents';

import view from './view';
import withTheme from 'helpers/withTheme';

import styles from "./styles.css";

const components = {
  text: require('components/CheckboxFacet').default,
  range: require('components/RangeFacet').default
};

const getComponent = (name, type) => components[name] || components[type] || (() => null);

export default compose(
  pure,

  setDisplayName('Facet'),

  withTheme(styles),

  withPropsOnChange(['config'], ({ config, item }) => {
    const name = item.get('name');
    const facetConfig = config.getIn(['facets', name]) || config.getIn(['facets', item.get('type')]);
    return {
      config: config.merge(facetConfig),
      title: config.getIn(['facets', 'labels', name], name),
      FacetComponent: getComponent(config.getIn(['facets', name], name), item.get('type')),
    }
  }),

  withStateHandlers(
    ({ config }: any) => ({ isOpen: config.getIn(['facets', 'initiallyExtended']) }),
    {
      showFacet: () => () => ({ isOpen: true }),
      hideFacet: () => () => ({ isOpen: false }),
      toggleFacet: ({ isOpen }) => () => ({ isOpen: !isOpen })
    }
  ),

  withEvents({
    showFacets: ({ showFacet, item }) => (name) =>
      (!name || item.get('name') === name) && showFacet(),
    hideFacets: ({ hideFacet, item }) => (name) => 
      (!name || item.get('name') === name) && hideFacet(),
  })
)(view);
