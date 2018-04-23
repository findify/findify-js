import React from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Item from 'components/CheckboxFacet/Item';
import Button from 'components/Button';
import VirtualizedList from 'components/common/VirtualizedList';
import Text from 'components/Text';
import Icon from 'components/Icon';

export default ({
  theme,
  items,
  config,
  search,
  isExpanded,
  onSearch,
  onToggle
}) =>
<div className={theme.root}>

  <div className={theme.search} display-if={isExpanded}>
    <input
      placeholder={config.getIn(['i18n', 'search'])}
      className={theme.input}
      onChange={onSearch}
      value={search}/>
    <Icon name='Search' className={theme.icon} />
  </div>

  <MapArray
    display-if={config.get('pullSelected')}
    array={items.filter(i => i.get('selected'))}
    factory={Item}
    theme={theme} />

  <VirtualizedList
    display-if={isExpanded}
    factory={(props) => Item({ ...props, onItemClick: () => onSearch('') })}
    theme={theme}
    className={theme.expandedList}
    height={config.get('expandedHeight')}
    array={(
      config.get('pullSelected')
        ? items.filter(i => !i.get('selected'))
        : items
      ).sortBy(i => i.get('value'))
    }
    config={config} />

  <MapArray
    display-if={!isExpanded}
    array={config.get('pullSelected') ? items.filter(i => !i.get('selected')) : items}
    factory={Item}
    theme={theme}
    limit={config.get('maxItemsCount')} />

  <Button
    className={theme.expand}
    onClick={onToggle}
    display-if={items.size > config.get('maxItemsCount')}>
    <Text primary uppercase>
      <Icon name={isExpanded ? 'Minus' : 'Plus'} />
      { isExpanded ? config.getIn(['i18n', 'less']) : config.getIn(['i18n', 'more']) }
    </Text>
  </Button>

</div>

