/**
 * @module layouts/Autocomplete/Dropdown
 */

import Tip from 'components/autocomplete/Tip';
import ProductMatches from 'components/autocomplete/ProductMatches';
import SearchSuggestions from 'components/autocomplete/SearchSuggestions';
import { useSuggestions } from '@findify/react-connect';
import cx from 'classnames';
import { ThemedSFCProps, MJSConfiguration, ISuggestion, MJSValue } from 'types';
import { List } from 'immutable';
import { usePosition } from 'layouts/Autocomplete/Dropdown/trackPosition';
import { useAutocompleteLogic } from 'layouts/Autocomplete/withAutocompleteLogic';
import Grid from 'components/common/Grid';
import useTranslations from 'helpers/useTranslations';
import styles from 'layouts/Autocomplete/Dropdown/styles.css';
import { Immutable } from '@findify/store-configuration';

export interface IAutocompletePanel extends ThemedSFCProps {
  config: Immutable.AutocompleteConfig;
  isTrendingSearches?: boolean;
  [x: string]: any;
}

/** Layout column mapping */
const Suggestions = ({
  config,
  theme = styles,
  isTrendingSearches,
  ...rest
}: IAutocompletePanel) => {
  const translate = useTranslations();
  return (
    <div className={theme.suggestionsContainer}>
      <h4
        className={cx(theme.typeTitle, theme.suggestionsTitle, {
          [theme.trendingTitle]: isTrendingSearches,
        })}
      >
        {isTrendingSearches
          ? translate('autocomplete.trendingSearches')
          : translate('autocomplete.suggestionsTitle')}
      </h4>
      <SearchSuggestions
        className={theme.searchSuggestions}
        widgetKey={config.get('widgetKey')}
        isTrendingSearches={isTrendingSearches}
        {...rest}
      />
    </div>
  );
};

const Products = ({
  config,
  theme = styles,
  isTrendingSearches,
  ...rest
}: IAutocompletePanel) => {
  const translate = useTranslations();
  return (
    <div className={theme.productMatchesContainer}>
      <h4
        className={cx(theme.typeTitle, {
          [theme.trendingTitle]: isTrendingSearches,
        })}
      >
        {isTrendingSearches
          ? translate('autocomplete.trendingProducts')
          : translate('autocomplete.productMatchesTitle')}
      </h4>
      <ProductMatches
        className={theme.productMatches}
        config={config}
        {...rest}
      />
    </div>
  );
};

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

export default ({ theme = styles, ...rest }: IAutocompleteDropdownProps) => {
  const {
    suggestions,
    meta,
    config,
  } = useSuggestions<Immutable.AutocompleteConfig>();
  const { selectedSuggestion, closeAutocomplete } = useAutocompleteLogic();
  const [position, register] = usePosition();
  const isTrendingSearches = !meta.get('q');
  const translate = useTranslations();

  return (
    <div
      display-if={suggestions && suggestions.size > 0}
      className={theme.wrapper}
    >
      <div
        display-if={config.getIn(['dropdown', 'overlay'])}
        className={theme.overlay}
        onClick={closeAutocomplete}
      />
      <section
        className={theme.root}
        data-findify-autocomplete={true}
        tabIndex={0}
        ref={register}
        style={{ [position]: 0 }}
      >
        <Tip
          className={theme.tip}
          title={translate('autocomplete.tipResults')}
          zeroResultsTitle={translate('autocomplete.viewAll')}
          widgetKey={config.get('widgetKey')}
        />
        <Grid className={theme.container} columns="auto|3">
          <Suggestions
            {...rest}
            selectedSuggestion={selectedSuggestion}
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
        </Grid>
      </section>
    </div>
  );
};
