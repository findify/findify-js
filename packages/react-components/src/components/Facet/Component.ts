import { compose, withPropsOnChange, componentFromProp, renderComponent } from 'recompose';
import TextFacet from 'components/CheckboxFacet';
import RangeFacet from 'components/RangeFacet';
import RatingFacet from 'components/RatingFacet';
import ColorFacet from 'components/ColorFacet';
import CategoryFacet from 'components/CategoryFacet';

const getComponent = type => ({
  text: TextFacet,
  range: RangeFacet,
  rating: RatingFacet,
  price: RangeFacet,
  color: ColorFacet,
  category: CategoryFacet
}[type] || (() => null));

export default compose<any, any>(
  withPropsOnChange(['config', 'type'], ({ config, facet }) => {
    const name = facet.get('name');
    const type = config.getIn(['facets', 'types', name]) || facet.get('type');
    const facetConfig = config.getIn(['facets', type]);
    return {
      config: config.merge(facetConfig),
      title: config.getIn(['facets', 'labels', name], name),
      component: getComponent(type),
    }
  }),
)(componentFromProp('component'))
