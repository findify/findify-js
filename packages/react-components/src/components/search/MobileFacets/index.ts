import { compose, withStateHandlers, setDisplayName } from 'recompose';
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
    { activeFacet: undefined },
    { selectFacet: () => activeFacet => ({ activeFacet }) }
  )
)(view);
