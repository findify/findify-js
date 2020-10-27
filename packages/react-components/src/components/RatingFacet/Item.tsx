/**
 * @module components/RatingFacet
 */

import React from 'react';
import content from 'components/RatingFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { IFacetValue, ThemedSFCProps, MJSConfiguration } from 'types';

/** Props that RatingFacet Item view accepts */
export interface IRatingFacetItemProps extends ThemedSFCProps {
  /** Facet item to render */
  item: IFacetValue;
  /** Custom inline style */
  style: React.CSSProperties;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const RatingFacetItem: React.SFC<IRatingFacetItemProps> = ({
  item,
  theme,
  style,
  config
}: IRatingFacetItemProps) =>
  <Button
    style={style}
    className={theme.item}
    onClick={item.toggle}
    role="listitem"
    aria-checked={item.get('selected') ? 'true' : 'false'}
    tabIndex={0}
  >
    <Text primary lowercase bold={item.get('selected')}>
      <Icon className={theme.checkbox} name={item.get('selected') ? 'CheckboxFilled' : 'CheckboxEmpty'} />
      { content({ item, config, theme }) }
    </Text>
    <Text secondary uppercase>
      ({ item.get('count') })
    </Text>
  </Button>

export default RatingFacetItem;
