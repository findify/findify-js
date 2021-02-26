/**
 * @module components/RangeFacet
 */

import React, { InputHTMLAttributes, useMemo } from 'react';
import cx from 'classnames';
import NumberInput from 'react-numeric-input';

import MapArray from 'components/common/MapArray';
import Item from 'components/RangeFacet/Item';
import Button from 'components/Button';
import Text from 'components/Text';
import { ThemedSFCProps, IFacet, IFacetValue, MJSConfiguration } from 'types';
import { List } from 'immutable';
import Grid from 'components/common/Grid';

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

const PriceInput = ({
  theme,
  currency,
  value,
  min,
  max,
  onBlur,
  onKeyPress,
  precision
}) => {
  return (
    <div className={theme.inputWrap}>
      <span className={theme.currency}>{currency}</span>
      <NumberInput
        {...inputDefaults}
        className={theme.input}
        precision={precision}
        value={value}
        max={max}
        min={min}
        onBlur={onBlur}
        onKeyPress={onKeyPress}
      />
    </div>
  )
}

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
  onKeypressMin,
  onKeypressMax,
  onPressButton,

}: IRangeFacetProps) => {
  const [selectedItems, notSelectedItems] = useMemo(() => [
    config.get('pullSelected')
      ? items.filter(i => i.get('selected'))
      : items,
    config.get('pullSelected')
      ? items.filter(i => !i.get('selected'))
      : items
  ], []);

  return (
    <div className={theme.root} role="list">

      <MapArray
        display-if={config.get('pullSelected')}
        array={selectedItems}
        factory={Item}
        config={config}
        theme={theme} />

      <MapArray
        array={notSelectedItems}
        factory={Item}
        config={config}
        theme={theme} />

      <Grid columns='3|fit|3|auto' className={cx(theme.range, theme.inputBlock)}>
        <PriceInput
          theme={theme}
          currency={currencySymbol}
          precision={config.get('precision', 0)}
          value={from}
          max={to || facet.get('max')}
          min={facet.get('min')}
          onBlur={onChangeMin}
          onKeyPress={onKeypressMin}
        />
        <div className={theme.divider}>-</div>
        <PriceInput
          theme={theme}
          currency={currencySymbol}
          precision={config.get('precision', 0)}
          value={to}
          min={from || facet.get('min')}
          max={facet.get('max')}
          onBlur={onChangeMax}
          onKeyPress={onKeypressMax}
        />
        <Button onClick={onPressButton} className={theme.submit}>
          <Text primary uppercase>
            {config.getIn(['i18n', 'submit'])}
          </Text>
        </Button>
      </Grid>
    </div>
  )
}
