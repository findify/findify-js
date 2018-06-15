/**
 * @module components/RangeFacet
 */

import React, { InputHTMLAttributes } from 'react';
import cx from 'classnames';
import NumberInput from 'react-numeric-input';

import MapArray from 'components/common/MapArray';
import Item from 'components/RangeFacet/Item';
import Button from 'components/Button';
import Text from 'components/Text';
import { ThemedSFCProps, IFacet, IFacetValue, MJSConfiguration } from 'types';
import { List } from 'immutable';

/** Input default styling parameters */
const inputDefaults = {
  style: false,
  mobile: false,
};

export interface IRangeFacetProps extends ThemedSFCProps {
  /** Facet to extract values from */
  facet: IFacet;
  /** Facet values */
  items: List<IFacetValue>;
  /** MJS Configuration */
  config: MJSConfiguration;
  /** Currency symbol */
  currencySymbol: string;
  /** Minimum possible price */
  from: number;
  /** Maximum possible price */
  to: number;
  /** Invoked when maximum range is changed */
  onChangeMax: (evt?: React.ChangeEvent<any>) => any;
  /** Invoked when minimum range is changed */
  onChangeMin: (evt?: React.ChangeEvent<any>) => any;
  /** Invoked when Go button is pressed */
  onCommit: () => any
}

const RangeFacetView: React.SFC<IRangeFacetProps> = ({
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

}: IRangeFacetProps) =>
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

export default RangeFacetView;
