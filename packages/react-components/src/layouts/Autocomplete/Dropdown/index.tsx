/**
 * @module layouts/Autocomplete/Dropdown
 */

import Layout from 'components/autocomplete/Layout';
import { useSuggestions } from '@findify/react-connect';
import { ThemedSFCProps, ISuggestion, MJSValue } from 'types';
import { List } from 'immutable';
import { usePosition } from 'layouts/Autocomplete/Dropdown/trackPosition';
import { useAutocompleteLogic } from 'layouts/Autocomplete/withAutocompleteLogic';
import { Immutable } from '@findify/store-configuration';
import { useEffect } from 'react';

import styles from 'layouts/Autocomplete/Dropdown/styles.css';
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
  const { closeAutocomplete } = useAutocompleteLogic();
  const [position, register] = usePosition(config);
  const isTrendingSearches = !meta.get('q');

  useEffect(() => {
    if (!isFullScreen) return;
    getContainer(config).classList.add(theme.fullscreen);
  }, []);

  if (!suggestions?.size) return;
  return (
    <>
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
        style={{
          [position]: 0,
        }}
      >
        <Layout
          className={theme.container}
          config={config}
          isTrendingSearches={isTrendingSearches}
        />
      </section>
    </>
  );
};
