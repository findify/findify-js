/**
 * @module layouts/ZeroResults
 */
import { useItems } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import ProductCard from 'components/Cards/Product';
import Text from 'components/Text';
import Grid from 'components/common/Grid';
import MapArray from 'components/common/MapArray';
import useTranslations from 'helpers/useTranslations';
import styles from 'layouts/ZeroResults/styles.css';
import { useEffect } from 'react';
import { ThemedSFCProps } from 'types';

/** Props that ZeroResults layout accepts */
export interface IZeroResultsProps extends ThemedSFCProps<typeof styles> {
  /** Query for items was not found */
  q: string;
}

export default ({ q, theme = styles }: IZeroResultsProps) => {
  const { items, config } = useItems<Immutable.SearchConfig>();
  const translate = useTranslations();
  useEffect(() => {
    const spinner = document.querySelector<HTMLElement>('.findify-component-spinner');
    if (spinner && !spinner.hidden) {
      spinner.hidden = true;
    }
  }, []);
  return (
    <div className={theme.container}>
      <div className={theme.wrapper}>
        <div className={theme.sorryContainer}>
          <Text
            style={{ marginTop: 20 }}
            primary
            html={translate(
              q
                ? 'zeroresults.noResultsFound'
                : 'zeroresults.noResultEmptyQuery',
              escape(q)
            )}
          />
        </div>
        <div className={theme.recommendationContainer}>
          <Text className={theme.recommendation} primary inlineBlock>
            {translate('zeroresults.checkOutPopularProducts')}
          </Text>
        </div>
      </div>
      <Grid
        role="main"
        wrapperComponent="ul"
        columnComponent="li"
        gutter={12}
        columns={config.getIn(['breakpoints', 'grid'])}
      >
        {MapArray({
          array: items,
          factory: ProductCard,
          config: config.get('product'),
        })}
      </Grid>
    </div>
  );
};
