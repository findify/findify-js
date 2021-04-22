/**
 * @module layouts/Autocomplete/Fullscreen
 */

import styles from 'layouts/Autocomplete/Fullscreen/styles.css';
import cx from 'classnames';
import { useSuggestions } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';
import { useAutocompleteLogic } from '../withAutocompleteLogic';
import React from 'react';
import Tip from 'components/autocomplete/Tip';
import Grid from 'components/common/Grid';
import { Products, Suggestions } from '../Dropdown';
import { AutocompleteType } from '../types';

export default ({ theme = styles, isMobile, ...rest }) => {
  const { suggestions, config, meta } = useSuggestions<Immutable.AutocompleteConfig>();
  const translate = useTranslations();
  const { selectedSuggestion, closeAutocomplete } = useAutocompleteLogic();
  const isTrendingSearches = !meta.get('q');

  const viewType: AutocompleteType = isMobile
    ? config.getIn(['template', 'mobile'])
    : config.getIn(['template', 'desktop']);

  const templateSetting = config.get(viewType);

  const showSuggestions = !isMobile || !!templateSetting?.getIn(['suggestions', 'display']);

  return (
    <div
      display-if={showSuggestions && suggestions && suggestions.size > 0}
      className={theme.wrapper}
    >
      <div
        className={theme.overlay}
        onClick={closeAutocomplete}
      />
      <section
        className={theme.root}
        data-findify-autocomplete={true}
        tabIndex={0}
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
            config={config}
            selectedSuggestion={selectedSuggestion}
            theme={theme}
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
