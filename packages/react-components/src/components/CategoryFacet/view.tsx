/**
 * @module components/CategoryFacet
 */

import React from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Item from 'components/CategoryFacet/Item';
import Button from 'components/Button';
import Text from 'components/Text';
import { IFacet, ThemedSFCProps, MJSConfiguration } from 'types';
import { List, Map } from 'immutable';

/** CategoryFacet props */
interface ICategoryFacetProps extends ThemedSFCProps {
  /** Categories facet */
  facet: IFacet;
  /** Facet items */
  items: List<Map<string, string | boolean | number>>
  /** Total count of selected facets */
  total: number;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const CategoryFacetView = ({
  theme,
  items,
  config,
  facet,
  total
}: ICategoryFacetProps) =>
<div className={theme.root}>
  <Button
    className={theme.item}
    onClick={facet.resetValues}>
    <Text lowercase primary bold={!items.find(i => i.get('selected') as boolean)}>
       All categories
    </Text>
    <Text secondary uppercase>
      ({ total })
    </Text>
  </Button>
  <MapArray
    config={config}
    array={items}
    factory={Item}
    theme={theme} />
</div>

export default CategoryFacetView;
