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

export default ({ item, theme, style, config }: IRangeFacetItemProps) => (
  <Button
    style={style}
    className={theme.item}
    onClick={item.toggle}
    role="checkbox"
    tabIndex={0}
    aria-checked={item.get('selected') ? 'true' : 'false'}
  >
    <Text primary lowercase bold={item.get('selected')} className={theme.content}>
      <Icon
        name={item.get('selected') ? 'CheckboxFilled' : 'CheckboxEmpty'}
        title={item.get('selected') ? 'Selected' : 'Not selected'}
      />
      { content({ item, config }) }
    </Text>
    <Text secondary uppercase>
      ({ item.get('count') })
    </Text>
  </Button>
)
