import styles from 'layouts/Autocomplete/Sidebar/styles.css';
import { useQuery, useSuggestions } from '@findify/react-connect';
import { useCallback, useEffect, useRef } from 'react';
import Drawer from 'components/common/Drawer';
import Icon from 'components/Icon';
import SearchSuggestions from 'components/autocomplete/SearchSuggestions';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';
import { AutocompleteType } from '../types';
import { Products } from 'layouts/Autocomplete/Dropdown';

export default ({ theme = styles, isMobile, ...rest }) => {
  const {
    suggestions,
    config,
    update,
    meta
  } = useSuggestions<Immutable.AutocompleteConfig>();
  const { query } = useQuery();
  const translate = useTranslations();
  const input = useRef<HTMLInputElement>(null);

  const isTrendingSearches = !meta.get('q');


  const viewType: AutocompleteType = isMobile
    ? config.getIn(['template', 'mobile'])
    : config.getIn(['template', 'desktop']);

  const templateSetting = config.get(viewType);

  const showSuggestions = !isMobile || !!templateSetting?.getIn(['suggestions', 'display']);

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

  const onFocusOut = useCallback((e) => {
    e.stopImmediatePropagation();
    if (e.relatedTarget !== input.current) return;
  }, []);

  useEffect(() => {
    if (input.current) input.current?.focus();
    document.addEventListener('focusout', onFocusOut, true);
    return () => {
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  const showProductMatches = templateSetting.getIn(['productMatches', 'display']);

  return (
    <Drawer hideModal={onExit}>
      <div className={theme.root} data-findify-autocomplete={true} tabIndex={0}>
        <div className={theme.backdrop} />
        <div className={theme.header}>
          <form onSubmit={onSubmit}>
            <input
              defaultValue={query.get('q')}
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
        <div
          display-if={showSuggestions && suggestions && suggestions.size > 0}
          className={theme.suggestionsWrapper}
        >
          <div className={theme.suggestionsContainer}>
            <h4 className={theme.typeTitle}>
              {translate('autocomplete.suggestionsTitle')}
            </h4>
            <SearchSuggestions />
          </div>
        </div>
        <Products
          display-if={showProductMatches}
          {...rest}
          theme={theme}
          config={config}
          isTrendingSearches={isTrendingSearches}
          padded
        />
      </div>
    </Drawer>
  );
};
