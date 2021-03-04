/**
 * @module components/search/LazyResults
 */
import { connectItems } from '@findify/react-connect';
import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import withLazy from 'helpers/withLazy';
import view from 'components/search/LazyResults/view';
import styles from 'components/search/LazyResults/styles.css';

export default compose(
  setDisplayName('LazyResults'),
  withTheme(styles),
  connectItems,
  withLazy(),
)(view);
