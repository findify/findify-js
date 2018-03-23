import { compose, withHandlers } from 'recompose';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import view from './view';
import styles from "./styles.css";

export default compose(
  withTheme(styles),
  withEvents(),
  withHandlers({
    showFacets: ({ emit }) => () => emit('toggleMobileFacets'),
    showSort: ({ emit }) => () => emit('toggleMobileSort')
  })
)(view);
