/**
 * @module layouts/Recommendation/Grid
 */

import Grid from 'components/common/Grid';
import Text from 'components/Text';
import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types/index';
import { List } from 'immutable';
import Product from 'components/Cards/Product';
import MapArray from 'components/common/MapArray';
import styles from 'layouts/Recommendation/Grid/styles.css';
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';

/** This is a list of props Grid layout for Recommendations accepts */
export interface IGridProps extends ThemedSFCProps {
  /** immutable.List of Products to display */
  items: List<IProduct>;
  /** MJS configuration */
  config: MJSConfiguration;

  columns: string;
}

export default ({ theme = styles }: IGridProps) => {
  const { items, config } = useItems<Immutable.RecommendationConfig>();
  if (!items?.size) return null;
  return (
    <>
      <Text title component="p" className={theme.title}>
        {config.get('title')}
      </Text>
      <Grid gutter={20} columns={config.getIn(['breakpoints', 'grid'])}>
        {MapArray({
          config: config.get('product'),
          array: items,
          factory: Product,
        })}
      </Grid>
    </>
  );
};
