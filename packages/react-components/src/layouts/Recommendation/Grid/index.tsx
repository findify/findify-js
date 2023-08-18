/**
 * @module layouts/Recommendation/Grid
 */

import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import Product from 'components/Cards/Product';
import Text from 'components/Text';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import { hideLoader } from 'helpers/loader';
import { List } from 'immutable';
import styles from 'layouts/Recommendation/Grid/styles.css';
import { IProduct, MJSConfiguration, ThemedSFCProps } from 'types/index';

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
  hideLoader();
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
