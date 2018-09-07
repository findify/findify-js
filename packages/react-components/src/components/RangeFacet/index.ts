/**
 * @module components/RangeFacet
 */
import React from 'react';
import { compose, withStateHandlers, withProps, setDisplayName, withPropsOnChange } from 'recompose';
import { findCurrency } from 'currency-formatter';
import withTheme from 'helpers/withTheme';
import template from 'helpers/template';

import view from 'components/RangeFacet/view';
import styles from 'components/RangeFacet/styles.css';
import { withHandlers } from 'recompose';

const createKey = (...args) => args.join('_');


export default compose(
  setDisplayName('RangeFacet'),

  withTheme(styles),

  withProps(({ facet, config }) => ({
    items: facet.get('values')
  })),

  withPropsOnChange(['config'], ({ config }) => ({
    currencySymbol: config.getIn(['currency', 'symbol']) ||
      findCurrency(config.getIn(['currency', 'code'])).symbol
  })),

  withStateHandlers<any, any, any>(
    ({ facet }) => ({ from: undefined, to: undefined }),
    {
      onReset: () => e => ({ from: void 0, to: void 0}),

      onChangeMin: ({ from, to }, { facet }) => e => {
        const value = parseFloat(e.target.value) || from || facet.get('min');
        if (isNaN(value)) return { from: void 0 };
        const normalizedValue = value > to
          ? to
          : value < facet.get('min')
            ? facet.get('min')
            : value;
        return { from: normalizedValue };
      },

      onChangeMax: ({ from, to }, { facet }) => e => {
        const value = parseFloat(e.target.value) || to || facet.get('max');
        if (isNaN(value)) return { to: void 0 };
        const normalizedValue =
          value < from
            ? from
            : value > facet.get('max')
              ? facet.get('max')
              : value;
        return { to: normalizedValue };
      },

      onCommit: ({ from, to }, { facet }) => () => {
        if (!from && !to) return;
        const key = [from, to].join('_');
        facet.setValue({ from, to });
        return { from: void 0, to: void 0};
      },
    },
  ),
  withHandlers({
    onPressButton: ({ onCommit }) => e => {
      e.preventDefault();
      Promise.resolve().then(() => onCommit());
    },
  }),

  withProps(({ onCommit }) => ({
    onKeypress: ({ key }) => key === 'Enter' && onCommit()
  }))
)(view);
