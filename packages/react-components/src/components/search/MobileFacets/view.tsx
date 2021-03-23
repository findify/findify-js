/**
 * @module components/search/MobileFacets
 */

import { withHandlers } from 'recompose';
import Branch from 'components/common/Branch';
import MapArray from 'components/common/MapArray';
import FacetTitles from 'components/search/MobileFacets/Titles';
import Component from 'components/Facet/Component';
import Button from 'components/Button';
import cx from 'classnames';
import Icon from 'components/Icon';
import Text from 'components/Text';
import { ThemedSFCProps, IFacet, MJSConfiguration, MJSValue } from 'types';
import { List } from 'immutable';

/** Props that FacetContent accepts */
export interface IFacetContentProps extends ThemedSFCProps {
  /** Currently active facet */
  active: IFacet;
  /** MJS Configuration */
  config: MJSConfiguration;
}

const FacetContent = ({ active, config, theme }: IFacetContentProps) => (
  <div className={cx(theme.container, theme[active.get('type') as string])}>
    <Component
      isExpanded
      type={active.get('type')}
      facet={active}
      config={config}
      theme={{
        range: theme.range,
        expand: theme.expand,
        expandedList: theme.expandedList,
      }}
      isMobile={true}
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

export default ({
  theme,
  facets,
  activeFacet,
  selectFacet,
  onReset,
  config,
  meta,
  hideModal,
  total,
  filtersSelected,
}: IMobileFacetsProps) => (
  <div className={cx(theme.modal, 'mobile')}>
    <div className={theme.header}>
      <div className={theme.title}>
        <Text primary uppercase display-if={!activeFacet}>
          {config.getIn(['facets', 'i18n', 'filters'], 'Filters')}
        </Text>
        <Text
          secondary
          uppercase
          display-if={!activeFacet && total}
          className={theme.filterCount}
        >
          ({total})
        </Text>
        <Text primary uppercase display-if={!!activeFacet}>
          {config.getIn(['facets', 'labels', activeFacet!.get('name')])}
        </Text>
        <Text
          secondary
          uppercase
          display-if={!!activeFacet && filtersSelected}
          className={theme.filterCount}
        >
          ({filtersSelected})
        </Text>
      </div>

      <Button
        onClick={activeFacet ? selectFacet : hideModal}
        className={theme.backButton}
      >
        <Icon name="ArrowBack" title="Go back" />
      </Button>

      <Button
        display-if={meta.get('filters') && meta!.get('filters')!.size}
        onClick={onReset}
      >
        <Text secondary uppercase>
          {config.getIn(['facets', 'i18n', 'clearAll'], 'Clear All')}
        </Text>
      </Button>
    </div>
    <div className={theme.body}>
      <Branch
        config={config}
        theme={theme}
        selectFacet={selectFacet}
        active={activeFacet}
        facets={facets}
        condition={!!activeFacet}
        right={FacetTitles}
        left={FacetContent}
      />
    </div>
    <Button
      className={theme.footer}
      onClick={activeFacet ? selectFacet : hideModal}
    >
      {config.getIn(
        ['facets', 'i18n', activeFacet ? 'done' : 'showResults'],
        'See results'
      )}
    </Button>
  </div>
);
