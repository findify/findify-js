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
import { IFacetValue, ThemedSFCProps, MJSConfiguration, IFacet } from 'types';
import { List } from 'immutable';
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
  facet,
  hidden,
}: ICheckboxFacetProps) => {
  const [search, setSearch] = useState('');
  const [isExpanded, setExpanded] = useState(false);
  const t = useTranslations();

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
          placeholder={t('facets.search')}
          className={theme.input}
          onChange={onSearch}
          value={search}
        />
        <Icon name="Search" className={theme.icon} title={t('facets.search')} />
      </div>

      <section role="list">
        <MapArray
          display-if={config.get('pullSelected')}
          array={items.filter((i) => i.get('selected'))}
          factory={Checkbox}
          content={content}
          isMobile={isMobile}
        />

        <VirtualizedList
          display-if={isExpanded}
          factory={Checkbox}
          isMobile={isMobile}
          onItemClick={() => setSearch('')}
          config={config}
          content={content}
          limit={config.get('maxItemsCount', 6)}
          className={theme.expandedList}
          array={
            config.get('pullSelected')
              ? items.filter((i) => !i.get('selected'))
              : items
          }
        />

        <MapArray
          display-if={!isExpanded}
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
            title={t(isExpanded ? 'Expanded' : 'Collapsed')}
          />
          {isExpanded ? t('facets.less') : t('facets.more')}
        </Text>
      </Button>
    </div>
  );
};
