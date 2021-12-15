/**
 * @module components/CheckboxFacet
 */

import { ChangeEvent, useCallback, useMemo, useState } from 'react';
import cx from 'classnames';
import MapArray from 'components/common/MapArray';
import Checkbox from 'components/common/Checkbox';
import Button from 'components/Button';
import Text from 'components/Text';
import Icon from 'components/Icon';
import { ThemedSFCProps, MJSConfiguration, IFacet } from 'types';
import content from 'components/CheckboxFacet/content';
import useTranslations from 'helpers/useTranslations';
import VirtualizedList from 'components/common/VirtualizedList';
import escapeRegExp from 'lodash/escapeRegExp';
import styles from 'components/CheckboxFacet/styles.css';

/** Props that CheckboxFacet accepts */
export interface ICheckboxFacetProps extends ThemedSFCProps {
  facet: IFacet;

  /** MJS Configuration */
  config: MJSConfiguration;
  /** Search string for filtering facet values */
  search?: string;
  /** Flag shows whether search functionality is enabled */
  isExpanded?: boolean;
  /** Flag to show if facet is opened on mobile */
  isMobile?: boolean;
  /** Callback invoked on search input change */
  onSearch: (evt: ChangeEvent<HTMLInputElement>) => any;
  /** Callback invoked on request to expand list completely */
  onToggle: (evt: Event) => any;

  hidden: boolean;
}

export default ({
  theme = styles,
  config,
  isMobile,
  isExpanded: _isExpanded,
  facet,
  hidden,
}: ICheckboxFacetProps) => {
  const [search, setSearch] = useState('');
  const [isExpanded, setExpanded] = useState(_isExpanded);
  const translate = useTranslations();

  const onSearch = useCallback((e: React.FormEvent<HTMLInputElement>) => {
    setSearch(e.target ? e.target.value : e);
  }, []);

  const items = useMemo(() => {
    if (isExpanded && search) {
      const regexp = new RegExp(escapeRegExp(search), 'gi');
      return facet.get('values').filter((i) => regexp.test(i.get('value')));
    }
    return facet.get('values');
  }, [search, isExpanded, facet]);

  return (
    <div
      className={cx(theme.root, { [theme.mobile]: isMobile })}
      id={`facet-${facet.get('name')}`}
      role="region"
      hidden={hidden}
    >
      <div className={theme.search} display-if={isExpanded}>
        <input
          placeholder={translate('facets.search')}
          className={theme.input}
          onChange={onSearch}
          value={search}
        />
        <Icon
          name="Search"
          className={theme.icon}
          title={translate('facets.search')}
        />
      </div>

      <section role="group">
        <MapArray
          display-if={config.get('pullSelected')}
          array={items.filter((i) => i.get('selected'))}
          factory={Checkbox}
          content={content}
          isMobile={isMobile}
        />

        <VirtualizedList
          display-if={!isMobile && isExpanded}
          factory={Checkbox}
          isMobile={isMobile}
          onItemClick={() => setSearch('')}
          config={config}
          content={content}
          limit={config.get('maxItemsCount', 6)}
          className={theme.expandedList}
          key={items.hashCode()}
          array={
            config.get('pullSelected')
              ? items.filter((i) => !i.get('selected'))
              : items
          }
        />

        <MapArray
          display-if={!isExpanded || isMobile}
          factory={Checkbox}
          isMobile={isMobile}
          limit={!isMobile && config.get('maxItemsCount', 6)}
          content={content}
          keyAccessor={(i) => i.get('value')}
          array={
            config.get('pullSelected')
              ? items.filter((i) => !i.get('selected'))
              : items
          }
        />
      </section>

      <Button
        className={theme.expand}
        onClick={() => setExpanded((exp) => !exp)}
        display-if={!isMobile && items.size > config.get('maxItemsCount', 6)}
      >
        <Text primary uppercase>
          <Icon
            name={isExpanded ? 'Minus' : 'Plus'}
            title={translate(
              isExpanded ? 'facets.expanded' : 'facets.collapsed'
            )}
          />
          {isExpanded ? translate('facets.less') : translate('facets.more')}
        </Text>
      </Button>
    </div>
  );
};
