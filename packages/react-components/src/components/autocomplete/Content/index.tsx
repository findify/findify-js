/**
 * @module components/autocomplete/Content
 */
import styles from 'components/autocomplete/Content/styles.css';
import ContentCard from 'components/Cards/Content';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import { useContent } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';

export default ({
  theme = styles,
  config,
  type,
  registerItems,
  highlightedItem,
}) => {
  const { items } = useContent<Immutable.AutocompleteConfig>({
    field: `content:${type}`,
  });

  registerItems(items, config.get('limit'));

  return (
    <div className={theme.root} display-if={items.size}>
      <h4 className={theme.title}>{config.get('title')}</h4>
      <Grid columns={config.getIn(['breakpoints', type], '12')}>
        {MapArray({
          array: items,
          limit: config.get('limit'),
          factory: ContentCard,
          config: config.get('item'),
          mapProps: (item) => ({
            highlighted:
              highlightedItem && item.hashCode() === highlightedItem.hashCode(),
          }),
        })}
      </Grid>
    </div>
  );
};
