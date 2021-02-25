/**
 * @module components/ColorFacet
 */

import React from 'react';
import Content from 'components/ColorFacet/content';
import Icon from 'components/Icon';
import cx from 'classnames';
/** Props that ColorFacet Item accepts */
import { IFacetValue, MJSConfiguration, ThemedSFCProps } from 'types';

export interface IColorFacetItemProps extends ThemedSFCProps {
  /** Facet to render */
  item: IFacetValue;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const Item = ({ item, theme, config }: IColorFacetItemProps) =>
  <button
    role="listitem"
    aria-checked={item.get('selected') ? 'true' : 'false'}
    tabIndex={0}
    className={cx(theme.item, (item.get('selected') as boolean) && theme.active)}
    onClick={item.toggle}
  >
    <Content item={item} config={config} theme={theme}>
      <Icon display-if={item.get('selected')} name='CheckmarkDark' className={theme.check} />
    </Content>
  </button>

export default Item;
