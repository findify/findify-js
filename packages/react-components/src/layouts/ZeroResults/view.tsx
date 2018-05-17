/**
 * @module layouts/ZeroResults
 */

import React from 'react';

import Grid from 'components/common/Grid';
import ItemsList from 'components/ItemsList';
import Text from 'components/Text';

import { List } from 'immutable';
import { IProduct, ThemedSFCProps, MJSConfiguration } from 'types';


/** Props that ZeroResults layout accepts */
interface IZeroResultsProps extends ThemedSFCProps {
  /** List of trending products */
  items: List<IProduct>;
  /** @hidden */
  title: string;
  /** MJS configuration */
  config: MJSConfiguration;
}

const ZeroResultsLayout = ({ items, title, theme, config }: IZeroResultsProps) => (
  <React.Fragment>
    <div className={theme.sorryRow}>
      <Text className={theme.sorry} primary bold uppercase inlineBlock>
        {config.getIn(['i18n', 'sorryNoResults'], 'Sorry!')}
      </Text>
      <Text primary inlineBlock html={title} />
    </div>
    <div className={theme.suggestionsRow}>
      <Text className={theme.possibleSuggestions} primary bold uppercase inlineBlock>
        {config.getIn(['i18n', 'tryOneOfThese'], 'Try one of these instead:')}
        {/* FIXME: add suggestions when trending searches API becomes available */}
      </Text>
    </div>
    <div className={theme.productRecommendationRow}>
      <Text className={theme.productRecommendation} primary bold uppercase inlineBlock>
        {config.getIn(['i18n', 'checkOutPopularProducts'], 'Or check out some of these popular products')}
      </Text>
    </div>
    <ItemsList wrapper={Grid} columns='3' />
  </React.Fragment>
)

export default ZeroResultsLayout;
