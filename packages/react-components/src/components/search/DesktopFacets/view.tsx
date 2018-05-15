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

const DefaultContent = ({ theme, children, config }) =>
  <div className={theme.root}>{children}</div>

export default ({ config, facets, theme, onReset, meta, hideFacets, visible }) =>
<Branch
  display-if={!config.get('hidableFacets') || visible}
  theme={theme}
  condition={config.getIn(['view', 'stickyFilters'])}
  left={Sticky}
  right={DefaultContent}>

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
    theme={{ root: theme.facet }}
    array={facets}
    factory={Facet}
    config={config}
    keyAccessor={i => i.get('name')} />

</Branch>
