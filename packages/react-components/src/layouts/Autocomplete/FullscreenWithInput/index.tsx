/**
 * @module layouts/Autocomplete/FullscreenWithInput
 */
import { useSuggestions } from '@findify/react-connect';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';
import { useAutocompleteLogic } from 'layouts/Autocomplete/withAutocompleteLogic';
import React, { useCallback, useEffect, useRef } from 'react';
import Icon from 'components/Icon';
import Layout from 'components/autocomplete/Layout';

import styles from 'layouts/Autocomplete/FullscreenWithInput/styles.css';
export interface IAutocompleteDropdownProps {
  /** MJS Configuration */
  config: Immutable.AutocompleteConfig;
  /** Selected suggestion index. -1 means no suggestion is selected on keyboard */
  selectedSuggestion: number;
  /** Flag that shows if autocomplete is running in TrendingSearches mode */
  isTrendingSearches: boolean;
  /** Flag that tells if mobileBreakpoint has been triggered */
  isMobile: boolean;
  /** Rest of the props passed down to panels */
  [x: string]: any;
}

export default ({ theme = styles, config }: IAutocompleteDropdownProps) => {
  const { suggestions, meta, update } = useSuggestions();
  const input = useRef<HTMLInputElement>(null);
  const translate = useTranslations();
  const { closeAutocomplete } = useAutocompleteLogic();
  const isTrendingSearches = !meta.get('q');

  const onExit = useCallback(() => {
    (window as any).findify.emit(
      'autocompleteFocusLost',
      config.get('widgetKey')
    );
  }, []);

  const onSubmit = useCallback(() => {
    (window as any).findify.emit(
      'search',
      config.get('widgetKey'),
      input.current?.value
    );
    onExit();
  }, []);

  const onInputChange = useCallback((e) => {
    const { value } = e.target;
    update('q', value);
  }, []);

  useEffect(() => {
    if (input.current) input.current?.focus();
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
      >
        <div className={theme.header}>
          <form onSubmit={onSubmit}>
            <input
              defaultValue={meta.get('q')}
              className={theme.input}
              ref={input}
              onChange={onInputChange}
              placeholder={translate('autocomplete.placeholder')}
            />
          </form>
          <div className={theme.icons}>
            <Icon
              onClick={onSubmit}
              className={theme.searchIcon}
              name={'Search'}
              width={18}
              height={18}
            />
            <div className={theme.iconDivider} />
            <Icon
              onClick={onExit}
              className={theme.xIcon}
              name={'XMobile'}
              width={13}
              height={13}
            />
          </div>
        </div>
        <Layout
          className={theme.container}
          config={config}
          isTrendingSearches={isTrendingSearches}
        />
      </section>
    </div>
  );
};
