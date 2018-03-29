import React from 'react';
import content from 'components/ColorFacet/content';
import Icon from 'components/Icon';
import cx from 'classnames';

export default ({ item, theme, config }) =>
<button className={cx(theme.item, item.get('selected') && theme.active)} onClick={item.toggle}>
  { content({ item, config, theme }) }
  <Icon display-if={item.get('selected')} name='CheckmarkDark' className={theme.check} />
</button>
