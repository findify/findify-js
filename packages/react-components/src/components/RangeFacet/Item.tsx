/**
 * @module components/RangeFacet
 */

import React from 'react';
import content from 'components/RangeFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { ThemedSFCProps, IFacet, IFacetValue, MJSConfiguration } from 'types';

export interface IRangeFacetItemProps extends ThemedSFCProps {
  /** Facet item to render */
  item: IFacetValue;
  /** Custom inline style */
  style: React.CSSProperties;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const RangeFacetItem: React.SFC<IRangeFacetItemProps> = ({ item, theme, style, config }) =>
<Button style={style} className={theme.item} onClick={item.toggle}>
  <Text primary lowercase bold={item.get('selected')} className={theme.content}>
    <Icon name={item.get('selected') ? 'CheckboxFilled' : 'CheckboxEmpty'} />
    { content({ item, config }) }
  </Text>
  <Text secondary uppercase>
    ({ item.get('count') })
  </Text>
</Button>

export default RangeFacetItem;
