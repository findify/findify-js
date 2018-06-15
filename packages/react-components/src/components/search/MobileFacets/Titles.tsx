/**
 * @module components/search/MobileFacets
 */

import React from 'react';
import { withHandlers, withPropsOnChange, compose } from 'recompose';
import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import Text from 'components/Text';
import { ThemedSFCProps, IFacet, MJSConfiguration } from 'types';
import { List } from 'immutable';

const withClickHandler = withHandlers({
  onClick: ({ selectFacet, item }) => () => selectFacet(item.get('name'))
});

/** Props that MobileFacets FacetLabel accepts */
export interface IMobileFacetsLabelProps extends ThemedSFCProps {
  /** Facet */
  item: IFacet;
  /** Count of filters enabled */
  filterCount?: number;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Click handler to open facet customization menu */
  onClick: (evt?: React.MouseEvent<any>) => any
}

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

/** Props that MobileFacets TitlesView accepts */
export interface IMobileFacetsTitlesProps extends ThemedSFCProps {
  /** immutable.List of facets */
  facets: List<IFacet>;
  /** Method to select facet by its name */
  selectFacet: (name: string) => any;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const MobileFacetsTitlesView = ({ theme, facets, selectFacet, config }: IMobileFacetsTitlesProps) =>
  <MapArray
    config={config}
    theme={theme}
    selectFacet={selectFacet}
    factory={FacetLabel}
    array={facets} />

export default MobileFacetsTitlesView;
