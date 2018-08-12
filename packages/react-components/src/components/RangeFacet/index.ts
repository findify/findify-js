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
      onCommit: ({ from, to }, { config, facet }) => e => {
        if (!from && !to) return;
        const key = [from, to].join('_');
        facet.setValue({ from, to });
        return { from: void 0, to: void 0 };
      },

      onChangeMin: ({ from, to }, { facet }) => e => {
        const val = (e.target ? parseFloat(e.target.value) : e) || from || facet.get('min');
        if (isNaN(val)) return { from: void 0 };
        const normalizedValue = val > to ? to : val;
        return { from: normalizedValue };
      },

      onChangeMax: ({ from, to }, { facet }) => e => {
        const val = (e.target ? parseFloat(e.target.value) : e) || to || facet.get('max');
        if (isNaN(val)) return { to: void 0 };
        const normalizedValue = val < from ? from : val;
        return { to: normalizedValue };
      },
    },
  ),
  withProps(({ onCommit }) => ({
    onKeypress: ({ key }) => key === 'Enter' && onCommit()
  }))
)(view);
