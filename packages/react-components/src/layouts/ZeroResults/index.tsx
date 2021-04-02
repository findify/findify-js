/**
 * @module layouts/ZeroResults
 */

import Grid from 'components/common/Grid';
import Text from 'components/Text';
import MapArray from 'components/common/MapArray';
import ProductCard from 'components/Cards/Product';
import { ThemedSFCProps } from 'types';
import useTranslations from 'helpers/useTranslations';
import { useItems } from '@findify/react-connect';
import useColumns from 'helpers/useColumns';
import styles from 'layouts/ZeroResults/styles.css';
import { Immutable } from '@findify/store-configuration';

/** Props that ZeroResults layout accepts */
export interface IZeroResultsProps extends ThemedSFCProps<typeof styles> {
  /** Query for items was not found */
  q: string;
}

export default ({ q, theme = styles }: IZeroResultsProps) => {
  const { items, config } = useItems<Immutable.RecommendationConfig>();
  const t = useTranslations();
  const columns = useColumns(
    config.getIn(['breakpoints', 'grid'], { 400: 6, 600: 4, 1000: 3 })
  );

  return (
    <div className={theme.container}>
      <div className={theme.wrapper}>
        <div className={theme.sorryContainer}>
          <Text className={theme.sorry} primary bold uppercase inlineBlock>
            {t('zeroresults.sorryNoResults')}
          </Text>
          <Text
            primary
            inlineBlock
            html={t(
              q
                ? 'zeroresults.noResultsFound'
                : 'zeroresults.noResultEmptyQuery',
              escape(q)
            )}
          />
        </div>
        <div className={theme.suggestionsContainer} display-if={false}>
          <Text
            className={theme.possibleSuggestions}
            primary
            bold
            uppercase
            inlineBlock
          >
            {t('zeroresults.tryOneOfThese')}
          </Text>
        </div>
        <div className={theme.recommendationContainer}>
          <Text
            className={theme.recommendation}
            primary
            bold
            uppercase
            inlineBlock
          >
            {t('zeroresults.checkOutPopularProducts')}
          </Text>
        </div>
      </div>
      <Grid columns={columns}>
        {MapArray({
          array: items,
          factory: ProductCard,
          config,
        })}
      </Grid>
    </div>
  );
};
