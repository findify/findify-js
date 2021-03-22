/**
 * @module components/search/StaticResults
 */
import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import withColumns from 'helpers/withColumns';

import view from 'components/search/StaticResults/view';
import styles from 'components/search/StaticResults/styles.css';

export default compose(
  setDisplayName('StaticResults'),

  withTheme(styles),

  withColumns()
)(view);
