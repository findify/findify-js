import { compose, setDisplayName, withStateHandlers, withPropsOnChange } from 'recompose';
import withEvents from 'helpers/withEvents';
import pure from 'helpers/pure';
import TextFacet from 'components/CheckboxFacet';
import RangeFacet from 'components/RangeFacet';
import ColorFacet from 'components/ColorFacet';
import CategoryFacet from 'components/CategoryFacet';

import view from './view';
import withTheme from 'helpers/withTheme';

import styles from "./styles.css";

const getComponent = type => ({
  text: TextFacet,
  range: RangeFacet,
  rating: RangeFacet,
  price: RangeFacet,
  color: ColorFacet,
  category: CategoryFacet
}[type] || (() => null));

export default compose(
  pure,

  setDisplayName('Facet'),

  withTheme(styles),

  withPropsOnChange(['config'], ({ config, item }) => {
    const name = item.get('name');
    const type = config.getIn(['facets', 'types', name]) || item.get('type');
    const facetConfig = config.getIn(['facets', type]);
    return {
      config: config.merge(facetConfig),
      title: config.getIn(['facets', 'labels', name], name),
      FacetComponent: getComponent(type),
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
