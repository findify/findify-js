import React from 'react';
import cx from 'classnames';

import MapArray from 'components/common/MapArray';
import Item from 'components/CheckboxFacet/Item';
import Button from 'components/Button';
import VirtualizedList from 'components/common/VirtualizedList';

export default ({
  theme,
  items,
  config,

  isExpanded,
  onSearch,
  onToggle
}) => 
<>

  <div className={theme.search} display-if={isExpanded}>
    <input className={theme.searchInput} onChange={onSearch} />
  </div>

  <MapArray
    display-if={config.get('pullSelected')}
    array={items.filter(i => i.get('selected'))}
    factory={Item}
    theme={theme} />

  <VirtualizedList
    display-if={isExpanded}
    factory={Item}
    theme={theme}
    className={theme.expandedList}
    height={config.get('expandedHeight')}
    array={config.get('pullSelected') ? items.filter(i => !i.get('selected')) : items}
    config={config} />

  <MapArray
    display-if={!isExpanded}
    array={config.get('pullSelected') ? items.filter(i => !i.get('selected')) : items}
    factory={Item}
    theme={theme}
    limit={config.get('maxItemsCount')} />

  <Button onClick={onToggle} display-if={items.size > config.get('maxItemsCount')}>
    { isExpanded ? config.getIn(['i18n', 'less']) : config.getIn(['i18n', 'more']) }
  </Button>

</>

