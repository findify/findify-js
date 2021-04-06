/**
 * @module layouts/Autocomplete/Fullscreen
 */

import Suggestions from 'components/autocomplete/SearchSuggestions';
import styles from 'layouts/Autocomplete/Fullscreen/styles.css';
import cx from 'classnames';
import { useSuggestions } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';
import { AutocompleteType } from '../types';

/** TODO: NEED TO REFACTOR  */
export default ({ theme = styles, isMobile }) => {
  const { suggestions, config } = useSuggestions<Immutable.AutocompleteConfig>();
  const translate = useTranslations();

  const viewType: AutocompleteType = isMobile
    ? config.getIn(['template', 'mobile'])
    : config.getIn(['template', 'desktop']);

  const templateSetting = config.get(viewType);

  const showSuggestions = !isMobile || !!templateSetting?.getIn(['suggestions', 'display']);

  return (
    <div
      display-if={showSuggestions &&  suggestions && suggestions.size > 0}
      className={theme.wrapper}
    >
      <div className={theme.root} data-findify-autocomplete tabIndex={0}>
        <div className={theme.container}>
          <h4 className={cx(theme.typeTitle, theme.suggestionsTitle)}>
            {translate('autocomplete.suggestionsTitle')}
          </h4>
          <Suggestions />
        </div>
      </div>
    </div>
  );
};
