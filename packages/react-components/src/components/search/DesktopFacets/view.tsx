import React from 'react';
import Branch from 'components/common/Branch';
import MapArray from 'components/common/MapArray';
import Facet from 'components/Facet';
import Sticky from 'components/common/Sticky';
import Text from 'components/Text';
import Button from 'components/Button';
import Icon from 'components/Icon';
import { classNames } from 'classnames';

const DefaultContent = ({ theme, children, config }) =>
  <div className={theme.root}>{children}</div>

export default ({ config, facets, theme, onReset, meta }) =>
<Branch
  theme={theme}
  condition={config.getIn(['view', 'stickyFilters'])}
  left={DefaultContent}
  right={Sticky}>

  <div className={theme.header} display-if={!config.get('showFacetsTitle')}>
    <Icon name='Filters' className={theme.icon} />
    <Text primary uppercase className={theme.title}>
      { config.getIn(['facets', 'i18n', 'filters'], 'Filters') }
    </Text>
  
    <Button
      display-if={meta.get('filters') && meta.get('filters').size}
      className={theme.reset}
      onClick={onReset}>
      <Text secondary uppercase>
        { config.getIn(['facets', 'i18n', 'clearAll'], 'Clear all') }
      </Text>
    </Button>

  </div>

  <MapArray
    theme={{ root: theme.facet }}
    array={facets}
    factory={Facet}
    config={config}
    keyAccessor={i => i.get('name')} />

</Branch>
