/**
 * @module layouts/ZeroResults
 */

import Grid from 'components/common/Grid';
import Text from 'components/Text';
import MapArray from 'components/common/MapArray';
import ProductCard from 'components/Cards/Product';
import { List } from 'immutable';
import { IProduct, ThemedSFCProps, MJSConfiguration } from 'types';
/**
 * @deprecated
 */
import ItemsList from 'components/ItemsList';

/** Props that ZeroResults layout accepts */
export interface IZeroResultsProps extends ThemedSFCProps {
  /** List of trending products */
  items: List<IProduct>;
  /** @hidden */
  title: string;
  /** MJS configuration */
  config: MJSConfiguration;
  /** Number of columns that each item occupies in 12-col grid */
  columns: number;
}

const ZeroResultsLayout = ({
  items,
  title,
  theme,
  columns,
  config,
}: IZeroResultsProps) => (
  <div className={theme.container}>
    <div className={theme.wrapper}>
      <div className={theme.sorryRow}>
        <Text className={theme.sorry} primary bold uppercase inlineBlock>
          {config.getIn(['i18n', 'sorryNoResults'], 'Sorry!')}
        </Text>
        <Text primary inlineBlock html={title} />
      </div>
      <div className={theme.suggestionsRow} display-if={false}>
        <Text
          className={theme.possibleSuggestions}
          primary
          bold
          uppercase
          inlineBlock
        >
          {config.getIn(['i18n', 'tryOneOfThese'], 'Try one of these instead:')}
          {/* FIXME: add suggestions when trending searches API becomes available */}
        </Text>
      </div>
      <div className={theme.productRecommendationRow}>
        <Text
          className={theme.productRecommendation}
          primary
          bold
          uppercase
          inlineBlock
        >
          {config.getIn(
            ['i18n', 'checkOutPopularProducts'],
            'Or check out some of these popular products'
          )}
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

export default ZeroResultsLayout;
