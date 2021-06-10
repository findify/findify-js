/**
 * @module components/search/MobileFacets
 */

import MapArray from 'components/common/MapArray';
import Button from 'components/Button';
import Text from 'components/Text';
import { ThemedSFCProps, IFacet } from 'types';
import { List } from 'immutable';
import { useCallback, useMemo } from 'react';
import { Immutable } from '@findify/store-configuration';

/** Props that MobileFacets FacetLabel accepts */
export interface IMobileFacetsLabelProps extends ThemedSFCProps {
  /** Facet */
  item: IFacet;
  /** Count of filters enabled */
  filterCount?: number;
  /** MJS Configuration */
  config: Immutable.SearchConfig;
  /** Click handler to open facet customization menu */
  onClick: (evt?: React.MouseEvent<any>) => any;
}

const FacetLabel = ({ item, theme, selectFacet, config }: any) => {
  const [isTextFacet, selectedValues] = useMemo(
    () => [
      item && ['category', 'text'].includes(item.get('type')),
      (item && item.get('values').filter((item) => item.get('selected'))) ||
        List(),
    ],
    [item]
  );

  const onClick = useCallback(() => {
    selectFacet(item.get('name'));
  }, [item]);

  return (
    <Button raw className={theme.facetTitle} onClick={onClick}>
      <div className={theme.flexFix}>
        <Text primary uppercase inlineBlock>
          {config.getIn(
            ['facets', item.get('name'), 'label'],
            item.get('name')
          )}
        </Text>
        <Text
          display-if={isTextFacet}
          secondary
          inlineBlock
          className={theme.selectedValues}
        >
          {selectedValues.map((item) => item.get('value')).join(', ')}
        </Text>
        <Text
          display-if={selectedValues.size > 0 && !isTextFacet}
          className={theme.filterCount}
          secondary
          uppercase
          inlineBlock
        >
          ({selectedValues.size})
        </Text>
      </div>
    </Button>
  );
};

/** Props that MobileFacets TitlesView accepts */
export interface IMobileFacetsTitlesProps extends ThemedSFCProps {
  /** immutable.List of facets */
  facets: List<IFacet>;
  /** Method to select facet by its name */
  selectFacet: (name: string) => any;
  /** MJS Configuration */
  config: Immutable.SearchConfig;
}

const MobileFacetsTitlesView = ({
  theme,
  facets,
  selectFacet,
  config,
}: IMobileFacetsTitlesProps) => (
  <MapArray
    config={config}
    theme={theme}
    selectFacet={selectFacet}
    factory={FacetLabel}
    array={facets}
  />
);

export default MobileFacetsTitlesView;
