/**
 * @module components/search/DesktopFacets
 */

import React from 'react';
import Branch from 'components/common/Branch';
import MapArray from 'components/common/MapArray';
import Facet from 'components/Facet';
import Sticky from 'components/common/Sticky';
import Text from 'components/Text';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { classNames } from 'classnames';
import * as titles from 'components/search/DesktopFacets/Title';
import { MJSConfiguration, ThemedSFCProps, IFacet, MJSValue } from 'types';
import { List, Map } from 'immutable';
import cx from 'classnames';

const DefaultContent = ({ theme, children, title }) =>
  <section
    className={theme.root}
    role="region"
    aria-label={title}
    tabIndex={0}
  >
    {children}
  </section>

/** Props that DesktopFacets view accepts */
export interface IDesktopFacetsProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Facets list */
  facets: List<IFacet>;
  /** Method called to reset facets */
  onReset: () => any;
  /** MJS API Response Metadata */
  meta: Map<string, MJSValue>;
  /** Method to hide facets */
  hideFacets: () => any;
  /** Shows visibility status of facets */
  visible: boolean;
}

const DesktopFacetsView: React.SFC<IDesktopFacetsProps> = ({
  config,
  facets,
  theme,
  onReset,
  meta,
  hideFacets,
  visible
}: IDesktopFacetsProps) => {
  const isHorizontal = config.getIn(['view', 'horizontalFilters']);
  return (
    <Branch
      display-if={!config.get('hidableFacets') || visible}
      theme={{
        ...theme,
        root: isHorizontal ? theme.horizontal : theme.root
      }}
      condition={config.getIn(['view', 'stickyFilters'])}
      title={config.getIn(['facets', 'i18n', 'filters'], 'Filters')}
      left={Sticky}
      right={DefaultContent}
      stickToTop={isHorizontal}
      offset={isHorizontal ? 0 : 25}
    >

      <Branch
        display-if={!config.get('showFacetsTitle')}
        meta={meta}
        config={config}
        theme={theme}
        onReset={onReset}
        onHide={hideFacets}
        condition={config.get('hidableFacets')}
        left={titles.hidable}
        right={titles.default}
      />

      <MapArray
        theme={{ root: theme.facetRoot, title: theme.facetTitle }}
        array={facets}
        factory={Facet}
        config={config}
        keyAccessor={i => i.get('name')} />

    </Branch>
  )
}

export default DesktopFacetsView;
