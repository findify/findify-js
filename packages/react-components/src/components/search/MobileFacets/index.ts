import { compose, withHandlers, withStateHandlers, branch, renderNothing, setDisplayName } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from "./styles.css";

export default compose(
  setDisplayName('MobileFacets'),

  withTheme(styles),

  withStateHandlers(
    { visible: false },
    { toggleVisibility: ({ visible }) => () => ({ visible: !visible }) }
  ),

  withEvents({
    toggleMobileFacets: ({ toggleVisibility }) => toggleVisibility
  }),

  withHandlers({
    onHideFacets: ({ emit }) => () => emit('toggleMobileFacets')
  }),

  branch(
    ({ visible }) => !visible,
    renderNothing
  )
)(view);
