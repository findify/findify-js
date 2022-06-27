/**
 * @module components/autocomplete/Content
 */
import cx from 'classnames';
import ContentCard from 'components/Cards/Content';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import { useContent } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import Title from 'components/autocomplete/BlockTitle';
import styles from 'components/autocomplete/Content/styles.css';

export default ({
  theme = styles,
  config,
  type,
  registerItems,
  highlightedItem,
}) => {
  const isBubble = config.getIn(['item', 'template']) === 'bubble';
  const Container = isBubble ? 'div' : Grid;
  const { items } = useContent<Immutable.AutocompleteConfig>({
    field: `content:${type}`,
  });

  registerItems(items, config.get('limit'));

  return (
    <div className={theme.root} display-if={items.size}>
      <Title>{config.get('title')}</Title>
      <Container
        gutter={!isBubble && 12}
        columns={!isBubble && config.getIn(['breakpoints', type], '12')}
        className={cx(theme.container, theme[config.get('template')])}
      >
        {MapArray({
          array: items,
          limit: config.get('limit'),
          isAutocomplete: true,
          factory: ContentCard,
          config: config.get('item'),
          mapProps: (item) => ({
            highlighted:
              highlightedItem && item.hashCode() === highlightedItem.hashCode(),
          }),
        })}
      </Container>
    </div>
  );
};
