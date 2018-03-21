import { compose, withStateHandlers, withProps, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import template from 'helpers/template';

import view from './view';
import styles from './styles.css';

const createKey = (...args) => args.join('_')
export default compose(
  setDisplayName('RangeFacet'),

  withTheme(styles),

  withProps(({ facet, config }) => ({
    items: facet.get('values')
  })),

  withStateHandlers<any, any, any>(
    ({ facet }) => ({ from: facet.get('min'), to: facet.get('max') }),
    {
      onCommit: ({ from, to }, { config, facet }) => e => {
        if (!from && !to) return;
        const key = [from, to].join('_');
        facet.setValue({ from, to });
        return { from: void 0, to: void 0 };
      },

      onChangeMin: ({ from, to }) => e => {
        const val = parseFloat(e.target.value) || from;
        const normalizedValue = val > to ? to : val;
        return { from: normalizedValue };
      },

      onChangeMax: ({ from, to }) => e => {
        const val = parseFloat(e.target.value) || to;
        const normalizedValue = val < from ? from : val;
        return { to: normalizedValue };
      },
    },
  )
)(view);
