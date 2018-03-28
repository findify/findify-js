import React from 'react';
import cx from 'classnames';
import NumberInput from 'react-numeric-input';

import MapArray from 'components/common/MapArray';
import Item from 'components/RangeFacet/Item';
import Button from 'components/Button';
import Text from 'components/Text';

const inputDefaults = {
  style: false,
  mobile: false,
};

export default ({
  theme,
  facet,
  items,
  config,
  currencySymbol,

  from,
  to,

  onChangeMax,
  onChangeMin,
  onCommit

}) =>
<div className={theme.root}>

  <MapArray
    display-if={config.get('pullSelected')}
    array={config.get('pullSelected') ? items.filter(i => i.get('selected')) : items}
    factory={Item}
    config={config}
    theme={theme} />

  <MapArray
    array={config.get('pullSelected') ? items.filter(i => !i.get('selected')) : items}
    factory={Item}
    config={config}
    theme={theme} />

  <div className={theme.range}>
    <div className={theme.inputWrap}>
      <span className={theme.currency}>{currencySymbol}</span>
      <NumberInput
        {...inputDefaults}
        className={theme.input}
        precision={config.get('precision', 0)}
        value={from}
        max={to || facet.get('max')}
        min={facet.get('min')}
        onBlur={onChangeMin}
      />
    </div>
    <div className={theme.divider}>-</div>
    <div className={theme.inputWrap}>
      <span className={theme.currency}>{currencySymbol}</span>
      <NumberInput
        {...inputDefaults}
        className={theme.input}
        precision={config.get('precision', 0)}
        value={to}
        min={from || facet.get('min')}
        max={facet.get('max')}
        onBlur={onChangeMax}
      />
    </div>
    <Button onClick={onCommit} className={theme.submit}>
      <Text primary uppercase>
        { config.getIn(['i18n', 'submit']) }
      </Text>
    </Button>
  </div>

</div>

