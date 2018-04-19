import React from 'react';
import { withHandlers, withPropsOnChange, compose } from 'recompose';
import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import Text from 'components/Text';

const withClickHandler = withHandlers({
  onClick: ({ selectFacet, item }) => () => selectFacet(item.get('name'))
});

const FacetLabel = compose(
  withClickHandler,
  withPropsOnChange(['item'], ({ item }) => ({
    filterCount: item && item.get('values').filter(item => item.get('selected')).size
  }))
)(({ item, theme, onClick, filterCount, config }: any) =>
  <Button raw className={theme.facetTitle} onClick={onClick}>
    <Text primary uppercase inlineBlock>
    { config.getIn(['facets', 'labels', item.get('name')], item.get('name')) }
    </Text>
    <Text secondary uppercase inlineBlock display-if={filterCount} className={theme.filterCount}>
      ({ filterCount })
    </Text>
  </Button>
)
export default ({ theme, facets, selectFacet, config }) =>
  <MapArray
    config={config}
    theme={theme}
    selectFacet={selectFacet}
    factory={FacetLabel}
    array={facets} />
