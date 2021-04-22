/**
 * @module components/ColorFacet
 */

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
  /** Is mobile breakpoint activated */
  isMobile?: boolean;
}

const Item = ({ item, theme, config, isMobile }: IColorFacetItemProps) => (
  <button
    role="checkbox"
    aria-checked={item.get('selected') ? 'true' : 'false'}
    tabIndex={0}
    className={cx(
      theme.item,
      (item.get('selected') as boolean) && theme.active
    )}
    onClick={item.toggle}
  >
    <Content item={item} config={config} theme={theme} isMobile={isMobile}>
      <Icon
        display-if={item.get('selected')}
        name="CheckmarkDark"
        className={theme.check}
        title="Selected"
      />
    </Content>
  </button>
);

export default Item;
