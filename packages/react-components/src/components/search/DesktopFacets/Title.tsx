import React from 'react';
import Text from 'components/Text';
import Icon from 'components/Icon';
import Button from 'components/Button';

export default ({ theme, config, meta, onReset }) =>
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

export const hidable = ({ theme, config, meta, onReset, onHide }) =>
<div className={theme.header} display-if={!config.get('showFacetsTitle')}>
  <Icon name='Filters' className={theme.icon} />
  <Text primary uppercase className={theme.title}>
    { config.getIn(['facets', 'i18n', 'filters'], 'Filters') }
    <Button
      display-if={meta.get('filters') && meta.get('filters').size}
      onClick={onReset}>
      <Text secondary uppercase style={{ marginLeft: 5 }}>
        ({ config.getIn(['facets', 'i18n', 'clearAll'], 'Clear all') })
      </Text>
    </Button>
  </Text>
  <Button
    className={theme.hide}
    onClick={onHide}>
    <Text secondary uppercase>
      { config.getIn(['facets', 'i18n', 'hide'], 'hide') }
      <Icon name='XDark' />
    </Text>
  </Button>
</div>
