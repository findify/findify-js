/**
 * @module layouts/Autocomplete/Dropdown
 */

import Tip from 'components/autocomplete/Tip';
import ProductMatches from 'components/autocomplete/ProductMatches';
import SearchSuggestions from 'components/autocomplete/SearchSuggestions';
import { useSuggestions } from '@findify/react-connect';
import { ThemedSFCProps, ISuggestion, MJSValue } from 'types';
import { List } from 'immutable';
import { usePosition } from 'layouts/Autocomplete/Dropdown/trackPosition';
import { useAutocompleteLogic } from 'layouts/Autocomplete/withAutocompleteLogic';
import Grid from 'components/common/Grid';
import useTranslations from 'helpers/useTranslations';
import styles from 'layouts/Autocomplete/Dropdown/styles.css';
import { Immutable } from '@findify/store-configuration';
import { useEffect } from 'react';

export interface IAutocompletePanel extends ThemedSFCProps {
  config: Immutable.AutocompleteConfig;
  isTrendingSearches?: boolean;
  [x: string]: any;
}

/** Props that SearchOrZero component accepts */
export interface ISearchOrZeroProps {
  /** List of search suggestions */
  suggestions: List<ISuggestion>;
  /** MJS Configuration */
  config: Immutable.AutocompleteConfig;
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
  config: Immutable.AutocompleteConfig;
  /** MJS API Request Meta */
  meta: Map<string, MJSValue>;
  /** Selected suggestion index. -1 means no suggestion is selected on keyboard */
  selectedSuggestion: number;
  /** Flag that shows if autocomplete is running in TrendingSearches mode */
  isTrendingSearches: boolean;
  /** Flag that tells if mobileBreakpoint has been triggered */
  isMobile: boolean;
  /** Rest of the props passed down to panels */
  [x: string]: any;
}

const getContainer = (config) =>
  document.querySelector(
    config
      .get('cssSelector')
      ?.split(' ')
      .map((i) => `.${i}`)
      .join('')
  );

export default ({
  theme = styles,
  config,
  isFullScreen,
}: IAutocompleteDropdownProps) => {
  const { suggestions, meta } = useSuggestions();
  const { selectedSuggestion, closeAutocomplete } = useAutocompleteLogic();
  const [position, register] = usePosition(config);
  const isTrendingSearches = !meta.get('q');
  const translate = useTranslations();

  useEffect(() => {
    if (!isFullScreen) return;
    getContainer(config).classList.add(theme.fullscreen);
  }, []);

  return (
    <div display-if={suggestions?.size > 0} className={theme.wrapper}>
      <div
        display-if={config.get('overlay')}
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
        <Grid
          className={theme.container}
          columns={config.getIn(['breakpoints', 'layout'], 'fit|auto')}
        >
          <SearchSuggestions
            display-if={config.getIn(['suggestions', 'display'])}
            selectedSuggestion={selectedSuggestion}
            config={config}
            isTrendingSearches={isTrendingSearches}
            template={config.getIn(['suggestions', 'template'])}
          />
          <ProductMatches
            display-if={config.getIn(['productMatches', 'display'])}
            config={config}
            isTrendingSearches={isTrendingSearches}
          />
        </Grid>
      </section>
    </div>
  );
};
