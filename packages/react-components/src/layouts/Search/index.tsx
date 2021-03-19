/**
 * @module layouts/Search
 */

import {
  compose,
  withProps,
  setDisplayName,
  branch,
  renderNothing,
} from 'recompose';
import { connectItems } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import withErrorHandler from 'helpers/withErrorHandler';
import view from 'layouts/Search/view';
import styles from 'layouts/Search/styles.css';
import { debounce } from 'helpers/debounce';
import withScrollOnItemsChange from 'helpers/withScrollOnItemsChange';

const Search = compose(
  setDisplayName('Search'),

  withTheme(styles),

  withErrorHandler,

  connectItems,

  withScrollOnItemsChange,

  branch(({ items }) => !items.size, renderNothing)
)(view);

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Search)
  : Search;
