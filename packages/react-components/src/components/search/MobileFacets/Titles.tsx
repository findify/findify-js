import React from 'react';
import { withHandlers } from 'recompose';
import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import Text from 'components/Text';

const withClickHandler = withHandlers({
  onClick: ({ selectFacet, item }) => () => selectFacet(item.get('name'))
});

const FacetLabel = withClickHandler(({ item, theme, onClick, config }: any) =>
  <Button className={theme.facetTitle} onClick={onClick}>
    <Text primary uppercase>
    { config.getIn(['facets', 'labels', item.get('name')], item.get('name')) }
    </Text>
  </Button>
);

export default ({ theme, facets, selectFacet, config }) =>
<div className={theme.titles}>
  <MapArray
    config={config}
    theme={theme}
    selectFacet={selectFacet}
    factory={FacetLabel}
    array={facets} />
</div>
