/**
 * @module layouts/ContentSearch
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

import view from 'layouts/Content/view';
import styles from 'layouts/Content/styles.css';

/** React component encapsulating most of UI logic inside ContentSearch */
const Content = compose(
  setDisplayName('Content'),

  withTheme(styles),

  withErrorHandler,

  connectItems,

  branch(({ items }) => !items.size, renderNothing),

  withProps(({ config }) => ({
    isMobile:
      config.get('forceMobile') ||
      window.innerWidth <= config.get('mobileBreakpoint'),
  }))
)(view);

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Content)
  : Content;
