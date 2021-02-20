/**
 * @module layouts/Autocomplete/Dropdown
 */

import React from 'react';
import Tip from 'components/autocomplete/Tip'
import ProductMatches from 'components/autocomplete/ProductMatches'
import SearchSuggestions from 'components/autocomplete/SearchSuggestions'
import { useSuggestions } from '@findify/react-connect';
import cx from 'classnames';
import { ThemedSFCProps, MJSConfiguration, ISuggestion, MJSValue } from 'types';
import { List } from 'immutable';
import { usePosition } from 'layouts/Autocomplete/Dropdown/trackPosition';

export interface IAutocompletePanel extends ThemedSFCProps {
  config: MJSConfiguration;
  isTrendingSearches?: boolean;
  [x: string]: any;
}

/** Layout column mapping */
const Suggestions = ({ config, theme, isTrendingSearches, ...rest }: IAutocompletePanel) => (
  <div className={theme.suggestionsContainer}>
    <h4 className={cx(theme.typeTitle, theme.suggestionsTitle, { [theme.trendingTitle]: isTrendingSearches })}>
      {config.getIn(['i18n', isTrendingSearches ? 'trendingSearches' : 'suggestionsTitle'])}
    </h4>
    <SearchSuggestions
      className={theme.searchSuggestions}
      widgetKey={config.get('widgetKey')}
      isTrendingSearches={isTrendingSearches}
      {...rest} />
  </div>
);

const Products = ({ config, theme, isTrendingSearches, ...rest }: IAutocompletePanel) => (
  <div className={theme.productMatchesContainer}>
    <h4 className={cx(theme.typeTitle, { [theme.trendingTitle]: isTrendingSearches })}>
      {config.getIn(['i18n', isTrendingSearches ? 'trendingProducts' : 'productMatchesTitle'])}
    </h4>
    <ProductMatches className={theme.productMatches} config={config} {...rest} />
  </div>
);

/** Props that SearchOrZero component accepts */
export interface ISearchOrZeroProps {
  /** List of search suggestions */
  suggestions: List<ISuggestion>;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** MJS API Request Meta */
  meta: Map<string, MJSValue>;
  /** Selected suggestion index. -1 means no suggestion is selected on keyboard */
  selectedSuggestion: number;
  /** Flag that shows if autocomplete is running in TrendingSearches mode */
  isTrendingSearches: boolean;
  /** Rest of the props passed down to panels */
  [x: string]: any;
}

export interface IAutocompleteDropdownProps {
  /** List of search suggestions */
  suggestions: List<ISuggestion>;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** MJS API Request Meta */
  meta: Map<string, MJSValue>;
  /** Selected suggestion index. -1 means no suggestion is selected on keyboard */
  selectedSuggestion: number;
  /** Flag that shows if autocomplete is running in TrendingSearches mode */
  isTrendingSearches: boolean;
  /** Rest of the props passed down to panels */
  [x: string]: any;
}

const AutocompleteDropdownView: React.SFC<IAutocompleteDropdownProps> = ({
  theme,
  innerRef,
  closeAutocomplete,
  ...rest
}: IAutocompleteDropdownProps) => {
  const { suggestions, meta, config } = useSuggestions();
  const isTrendingSearches = !meta.get('q');
  const [position, register] = usePosition(config);

  return (
    <div display-if={suggestions && suggestions.size > 0} className={theme.wrapper}>
      <div className={theme.overlay} display-if={config.get('showOverlay')} onClick={closeAutocomplete}></div>
      <div
        className={theme.root}
        data-findify-autocomplete={true}
        tabIndex={0}
        ref={register}
        style={{ [position]: 0 }}>
        <Tip
          className={theme.tip}
          title={config.getIn(['i18n', 'tipResults'])}
          zeroResultsTitle={config.getIn(['i18n', 'tipTrendingResults'], 'View All Results')}
          widgetKey={config.get('widgetKey')} />
        <div className={theme.container}>
          <Suggestions
            {...rest}
            theme={theme}
            config={config}
            icon={isTrendingSearches && 'Fire'}
            isTrendingSearches={isTrendingSearches}
          />
          <Products
            {...rest}
            theme={theme}
            config={config}
            isTrendingSearches={isTrendingSearches}
          />
        </div>
      </div>
    </div>
  )
}

export default AutocompleteDropdownView;

