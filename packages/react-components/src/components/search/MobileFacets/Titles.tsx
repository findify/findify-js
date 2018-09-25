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


/** TODO: Not sure this is really needed, but find a way to show selected filters count,
 *  when filters are overflowing, which is not hacky
 */
const FacetLabel = compose(
  withClickHandler,
  withPropsOnChange(['item'], ({ item }) => ({
    isTextFacet: item && ['category', 'text'].includes(item.get('type')),
    selectedValues: item && item.get('values').filter(item => item.get('selected')) || List(),
  }))
)(({ item, isTextFacet, theme, onClick, selectedValues, config }: any) =>
  <Button raw className={theme.facetTitle} onClick={onClick}>
    <div className={theme.flexFix}>
      <Text primary uppercase inlineBlock>
      { config.getIn(['facets', 'labels', item.get('name')], item.get('name')) }
      </Text>
      <Text
        display-if={isTextFacet}
        secondary
        inlineBlock
        className={theme.selectedValues}>
        {selectedValues.map(item => item.get('value')).join(', ')}
      </Text>
      <Text
        display-if={selectedValues.size > 0 && !isTextFacet}
        className={theme.filterCount}
        secondary
        uppercase
        inlineBlock>
        ({ selectedValues.size })
      </Text>
    </div>
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
