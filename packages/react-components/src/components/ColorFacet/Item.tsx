/**
 * @module components/ColorFacet
 */

import React from 'react';
import content from 'components/ColorFacet/content';
import Icon from 'components/Icon';
import cx from 'classnames';
/** Props that ColorFacet Item accepts */
import { IFacetValue, MJSConfiguration, ThemedSFCProps } from 'types/index';
interface IColorFacetItemProps extends ThemedSFCProps {
  /** Facet to render */
  item: IFacetValue;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const Item = ({ item, theme, config }: IColorFacetItemProps) =>
<button className={cx(theme.item, (item.get('selected') as boolean) && theme.active)} onClick={item.toggle}>
  { content({ item, config, theme }) }
  <Icon display-if={item.get('selected')} name='CheckmarkDark' className={theme.check} />
</button>

export default Item;
