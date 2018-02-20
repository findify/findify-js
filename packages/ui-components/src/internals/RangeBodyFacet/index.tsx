import * as React from 'react';
import {
  compose,
  withStateHandlers,
  withHandlers,
  mapProps,
  withPropsOnChange,
  defaultProps,
} from 'recompose';
import formatRange from 'helpers/formatRange';
import { findCurrency } from 'currency-formatter';
import { getRangeFacetKey } from 'helpers/getRangeFacetKey';
import * as cx from 'classnames';
import NumberInput from 'react-numeric-input';

const styles = require('./styles.css');

export const RangeBodyFacet: any = compose(
  defaultProps({
    useCurrency: false,
  }),
  withPropsOnChange(['min', 'max'], ({ min, max }) => ({
    initial: { min, max },
  })),
  withPropsOnChange(['config'], ({ config }) => {
    const currency = findCurrency(config.currency.code);
    const symbolOnLeft = config.currency.symbolOnLeft || currency.symbolOnLeft;
    return {
      symbolOnLeft,
      currencySymbol: (
        <span className={cx(styles.currency, symbolOnLeft && styles.pullRight)}>
          {config.currency.symbol || currency.symbol}
        </span>
      ),
    };
  }),
  withStateHandlers(
    ({ min, max }) => ({
      min: void 0,
      max: void 0,
    }),
    {
      onCommit: (
        { min: from, max: to },
        { onChange, config, values, name },
      ) => e => {
        if (!from && !to) return;

        const key = getRangeFacetKey({ from, to });
        if (values.find(item => item.key === key)) return;

        const label = formatRange({ from, to, config });
        onChange({ selected: true, from, to, key, label, name });

        return { min: void 0, max: void 0 };
      },

      updateMin: ({ min, max }) => e => {
        const val = parseFloat(e.target.value) || min;
        const normalizedValue = val > max ? max : val;
        return { min: normalizedValue };
      },

      updateMax: ({ max, min }) => e => {
        const val = parseFloat(e.target.value) || max;
        const normalizedValue = val < min ? min : val;
        return { max: normalizedValue };
      },
    },
  ),
)(
  ({
    initial,
    max,
    min,
    updateMin,
    updateMax,
    onCommit,
    useCurrency,
    symbolOnLeft,
    currencySymbol,
    config: { i18n, precision = 0 },
  }: any) => (
    <div className={styles.root}>
      <div className={styles.inputWrap}>
        {useCurrency && !!symbolOnLeft && currencySymbol}
        <NumberInput
          style={false}
          className={styles.input}
          value={min}
          max={max || initial.max}
          precision={precision}
          min={initial.min}
          mobile={false}
          onBlur={updateMin}
        />
        {useCurrency && !symbolOnLeft && currencySymbol}
      </div>
      <div className={styles.separator}>-</div>
      <div className={styles.inputWrap}>
        {useCurrency && !!symbolOnLeft && currencySymbol}
        <NumberInput
          style={false}
          className={styles.input}
          value={max}
          mobile={false}
          precision={precision}
          min={min || initial.min}
          max={initial.max}
          onBlur={updateMax}
        />
        {useCurrency && !symbolOnLeft && currencySymbol}
      </div>
      <div className={styles.commitWrap}>
        <button className={styles.button} onClick={onCommit}>
          {i18n.submit}
        </button>
      </div>
    </div>
  ),
);
