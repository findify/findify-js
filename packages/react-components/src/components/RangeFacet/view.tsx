import React from 'react';
import cx from 'classnames';
import NumberInput from 'react-numeric-input';

import MapArray from 'components/common/MapArray';
import Item from 'components/RangeFacet/Item';
import Button from 'components/Button';

const inputDefaults = {
  style: false,
  mobile: false,
};

export default ({
  theme,
  facet,
  items,
  config,

  from,
  to,

  onChangeMax,
  onChangeMin,
  onCommit

}) =>
<>
  <MapArray
    display-if={config.get('pullSelected')}
    array={config.get('pullSelected') ? items.filter(i => i.get('selected')) : items}
    factory={Item}
    theme={theme} />

  <MapArray
    array={config.get('pullSelected') ? items.filter(i => !i.get('selected')) : items}
    factory={Item}
    theme={theme} />

  <div className={theme.range}>
    <NumberInput
      {...inputDefaults}
      className={theme.input}
      precision={config.get('precision', 0)}
      value={from}
      max={to || facet.get('max')}
      min={facet.get('min')}
      onBlur={onChangeMin}
    />
    <NumberInput
      {...inputDefaults}
      className={theme.input}
      precision={config.get('precision', 0)}
      value={to}
      min={from || facet.get('min')}
      max={facet.get('max')}
      onBlur={onChangeMax}
    />
    <Button onClick={onCommit}>Apply</Button>
  </div>
</>

