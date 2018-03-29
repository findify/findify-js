import { compose, withStateHandlers, setDisplayName, withProps, withPropsOnChange } from 'recompose';
import { connectFacets } from '@findify/react-connect';

import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from "./styles.css";

export default compose(
  setDisplayName('MobileFacets'),

  withTheme(styles),

  connectFacets,

  withStateHandlers(
    { activeFacet: false },
    { selectFacet: () => activeFacet => ({ activeFacet }) }
  ),

  withPropsOnChange(['activeFacet', 'facets'], ({ activeFacet, facets }) => ({
    activeFacet: activeFacet && facets.find(f => f.get('name') === activeFacet)
  }))
)(view);
