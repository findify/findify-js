/**
 * @module components/search/MobileFacets
 */

import Branch from 'components/common/Branch';
import FacetTitles from 'components/search/MobileFacets/Titles';
import Component from 'components/Facet/Component';
import Button from 'components/Button';
import cx from 'classnames';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { ThemedSFCProps, IFacet, MJSConfiguration, MJSValue } from 'types';
import { List } from 'immutable';

import styles from 'components/search/MobileFacets/styles.css';
import { useFacets, useQuery } from '@findify/react-connect';
import { memo, useCallback, useMemo, useState } from 'react';
import { Immutable } from '@findify/store-configuration';
import useTranslations from 'helpers/useTranslations';
import { Facet } from '@findify/react-connect/types/immutable/facets';

/** Props that FacetContent accepts */
export interface IFacetContentProps extends ThemedSFCProps {
  /** Currently active facet */
  active: Facet;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const FacetContent = ({
  active,
  config,
  theme = styles,
}: IFacetContentProps) => (
  <div className={cx(theme.container, theme[active.get('type') as string])}>
    <Component
      isExpanded
      isMobile
      type={active.get('type')}
      facet={active}
      config={config}
    />
  </div>
);

/** Props that MobileFacets view accepts */
export interface IMobileFacetsProps extends ThemedSFCProps {
  /** immutable.List() of Facets */
  facets: List<IFacet>;
  /** Currently active facet */
  activeFacet?: IFacet;
  /** Method used to select a facet */
  selectFacet: (name?: string) => any;
  /** Method used to reset facet */
  onReset: () => any;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** MJS API Request Metadata */
  meta: Map<string, MJSValue>;
  /** Method used for hiding modal / drawer */
  hideModal: (name: string) => any;
  /** Total filters selected */
  total: number;
  /** Filters selected for active facet */
  filtersSelected: number;
}

export default memo(({ theme = styles, hideModal }: IMobileFacetsProps) => {
  const { facets, config, update } = useFacets<Immutable.SearchConfig>();
  const { query } = useQuery();
  const translate = useTranslations();
  const [activeFacetName, setActiveFacet] = useState<string | null>(null);

  const total = useMemo(
    () =>
      query.get('filters')
        ? query
            .get('filters')
            .reduce(
              (acc, filter) =>
                acc +
                (/category[2-9]/.test(filter.get('name'))
                  ? 0
                  : filter.get('values').size),
              0
            )
        : 0,
    [query]
  );

  const activeFacet = useMemo(
    () => facets.find((f) => f.get('name') === activeFacetName),
    [activeFacetName]
  );

  const filtersSelected = useMemo(() => {
    if (!activeFacet) return 0;
    return activeFacet.get('values').filter((item) => item.get('selected'))
      .size;
  }, [activeFacet]);

  const selectFacet = useCallback((name) => {
    setActiveFacet(name || null);
  }, []);

  const onReset = useCallback(() => {
    update('filters', (f) => f && f.clear());
  }, []);

  return (
    <div className={cx(theme.modal, 'mobile')}>
      <div className={theme.header}>
        <div className={theme.title}>
          <Text primary uppercase display-if={!activeFacet}>
            {translate('facets.filters')}
          </Text>

          <Text
            secondary
            uppercase
            display-if={!activeFacet && total}
            className={theme.filterCount}
          >
            ({total})
          </Text>

          <Text primary uppercase display-if={activeFacet}>
            {config.getIn(['facets', activeFacet?.get('name'), 'label'])}
          </Text>

          <Text
            secondary
            uppercase
            display-if={activeFacet && filtersSelected}
            className={theme.filterCount}
          >
            ({filtersSelected})
          </Text>
        </div>

        <Button
          onClick={activeFacet ? selectFacet : hideModal}
          className={theme.backButton}
        >
          <Icon name="ArrowBack" title={translate('facets.back')} />
        </Button>

        <Button display-if={query?.get('filters')?.size} onClick={onReset}>
          <Text secondary uppercase>
            {translate('facets.clearAll')}
          </Text>
        </Button>
      </div>
      <div className={theme.body}>
        <Branch
          config={config}
          theme={theme}
          selectFacet={selectFacet}
          active={facets.find((f) => f.get('name') === activeFacetName)}
          facets={facets}
          condition={activeFacet}
          right={FacetTitles}
          left={FacetContent}
        />
      </div>
      <Button
        className={theme.footer}
        onClick={activeFacet ? selectFacet : hideModal}
      >
        {activeFacet
          ? translate('facets.done')
          : translate('facets.seeResults')}
      </Button>
    </div>
  );
});
