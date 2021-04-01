/**
 * @module components/CategoryFacet
 */
import MapArray from 'components/common/MapArray';
import content from 'components/CategoryFacet/content';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { ThemedSFCProps, MJSConfiguration } from 'types';
import styles from 'components/CategoryFacet/styles.css';
import cx from 'classnames';

/** This is a list of props that each individual child of CategoryFacet View accepts */
export interface ICategoryFacetCategoryProps extends ThemedSFCProps {
  /** TODO: add typings for Item here */
  item: any;
  /** Custom inline styles for Button holding CategoryFacet Item */
  style: { [x: string]: string | number };
  /** MJS Configuration */
  config: MJSConfiguration;
  isMobile?: boolean;
}

const Item = ({
  item,
  theme = styles,
  style,
  config,
  isMobile,
}: ICategoryFacetCategoryProps) => (
  <>
    <Button
      style={style}
      className={cx(theme.item, isMobile && theme.mobile)}
      onClick={item.toggle}
      role="checkbox"
      area-checked={item.get('selected') ? 'true' : 'false'}
    >
      <Text
        className={theme.content}
        primary
        lowercase
        bold={item.get('selected')}
      >
        {content({ item })}
        <Icon
          display-if={item.get('has_children')}
          name={item.get('selected') ? 'ArrowDown' : 'ArrowRight'}
          title={item.get('selected') ? 'Extended' : 'Collapsed'}
        />
      </Text>
      <Text secondary uppercase>
        ({item.get('count')})
      </Text>
    </Button>
    <div display-if={item.get('children')} className={theme.nested}>
      <MapArray
        config={config}
        array={item.get('children')}
        factory={Item}
        theme={theme}
        isMobile={isMobile}
      />
    </div>
  </>
);

export default Item;
