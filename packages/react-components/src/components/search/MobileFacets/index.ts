import { compose, withStateHandlers, setDisplayName, withProps, withPropsOnChange, withHandlers } from 'recompose';
import { connectFacets, connectQuery } from '@findify/react-connect';

import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from "./styles.css";

export default compose(
  setDisplayName('MobileFacets'),

  withTheme(styles),

  connectFacets,
  connectQuery,

  withHandlers({
    onReset: ({ update, meta }) => () =>  update('filters', f => f && f.clear()) // Reset values
  }),
  

  withStateHandlers<{activeFacet: string | boolean}, any, any>(
    { activeFacet: false },
    { selectFacet: () => name => ({ activeFacet: typeof name === 'string' ? name : false }) }
  ),

  withPropsOnChange(['activeFacet', 'facets'], ({ activeFacet, facets }) => ({
    activeFacet: activeFacet && facets.find(f => f.get('name') === activeFacet)
  })),

  withPropsOnChange(['query'], ({ query }) => query.get('filters') && ({
    total: query.get('filters').reduce((acc, filter) => acc + filter.size, 0)
  }))
)(view);
