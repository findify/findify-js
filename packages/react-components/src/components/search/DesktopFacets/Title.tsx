/**
 * @module components/search/DesktopFacets
 */

import React from 'react';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Button from 'components/Button';
import { ThemedSFCProps, MJSConfiguration, MJSValue } from 'types';
import { Map, List } from 'immutable';

/** Props that hidable facet titles accept */
export interface IHidableProps extends ITitlesProps {
  /** Method to hide facets */
  onHide: () => any;
}

/** Props that facet titles accept */
export interface ITitlesProps extends ThemedSFCProps {
  /** MJS Configuration */
  config: MJSConfiguration;
  /** MJS API Response Metadata */
  meta: Map<string, MJSValue>;
  /** Method to reset facets */
  onReset: () => any;
}



const defaultTitles: React.SFC<ITitlesProps> = ({
  theme,
  config,
  meta,
  onReset
}: ITitlesProps) => (
  <div className={theme.header} display-if={!config.get('showFacetsTitle')}>
    <Icon name='Filters' title='Filters' className={theme.icon} />
    <Text primary uppercase className={theme.title}>
      { config.getIn(['facets', 'i18n', 'filters'], 'Filters') }
    </Text>

    <Button
      display-if={meta.get('filters') && (meta.get('filters')! as List<any>).size}
      className={theme.reset}
      onClick={onReset}
    >
      <Text secondary uppercase>
        { config.getIn(['facets', 'i18n', 'clearAll'], 'Clear all') }
      </Text>
    </Button>
  </div>
)

export default defaultTitles

export const hidable: React.SFC<IHidableProps> = ({
  theme,
  config,
  meta,
  onReset,
  onHide
}: IHidableProps) => (
<div className={theme.header} display-if={!config.get('showFacetsTitle')} tabIndex={-1}>
  <Icon name='Filters' title='Filters' className={theme.icon} />
  <Text primary uppercase className={theme.title}>
    { config.getIn(['facets', 'i18n', 'filters'], 'Filters') }
    <Button
      tabIndex={-1}
      display-if={meta.get('filters') && (meta.get('filters')! as List<any>).size}
      onClick={onReset}>
      <Text secondary uppercase style={{ marginLeft: 5 }}>
        ({ config.getIn(['facets', 'i18n', 'clearAll'], 'Clear all') })
      </Text>
    </Button>
  </Text>
  <Button
    tabIndex={-1}
    className={theme.hide}
    onClick={onHide}>
    <Text secondary uppercase>
      { config.getIn(['facets', 'i18n', 'hideDesktopFacets'], 'Hide') }
      <Icon name='XDark' title='Hide filters' />
    </Text>
  </Button>
  </div>
)
