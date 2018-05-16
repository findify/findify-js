/**
 * @module components/CategoryFacet
 */

import React from 'react';
import cx from 'classnames';
import MapArray from 'components/common/MapArray';
import content from 'components/CategoryFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { ThemedSFCProps, MJSConfiguration } from 'types/index';

/** This is a list of props that each individual child of CategoryFacet View accepts */
interface ICategoryFacetCategoryProps extends ThemedSFCProps {
  /** TODO: add typings for Item here */
  item: any;
  /** Custom inline styles for Button holding CategoryFacet Item */
  style: {[x: string]: string | number};
  /** MJS Configuration */
  config: MJSConfiguration;
}

const Item = ({ item, theme, style, config }: ICategoryFacetCategoryProps) =>
<>
  <Button
    style={style}
    className={theme.item}
    onClick={item.toggle}>
    <Text primary lowercase bold={item.get('selected')}>
      { content({ item }) }
      <Icon
        display-if={item.get('has_children')}
        name={ item.get('selected') ? 'ArrowDown' : 'ArrowRight' } />
    </Text>
    <Text secondary uppercase>
      ({ item.get('count') })
    </Text>
  </Button>
  <div display-if={item.get('children')} className={theme.nested}>
    <MapArray
      config={config}
      array={item.get('children')}
      factory={Item}
      theme={theme} />
  </div>
</>

export default Item;
