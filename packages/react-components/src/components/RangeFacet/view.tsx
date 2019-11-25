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
  /** Invoked when any key in any input is pressed, used to react to Enter */
  onKeypressMin: (evt: any) => any
  onKeypressMax: (evt: any) => any
  /** Invoked when Go button is pressed */
  onPressButton: () => any
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
  onKeypressMin,
  onKeypressMax,
  onPressButton,

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

  <div className={cx(theme.range, theme.inputBlock)}>
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
        onKeyPress={onKeypressMin}
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
        onKeyPress={onKeypressMax}
      />
    </div>
    <Button onClick={onPressButton} className={theme.submit}>
      <Text primary uppercase>
        { config.getIn(['i18n', 'submit']) }
      </Text>
    </Button>
  </div>

</div>

export default RangeFacetView;
