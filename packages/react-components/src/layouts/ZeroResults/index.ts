import { compose, withProps, setDisplayName } from 'recompose';
import { connectItems, connectQuery } from '@findify/react-connect';
import withTheme from 'helpers/withTheme';
import template from 'helpers/template';
import escape from 'lodash/escape';

import view from './view';
import styles from "./styles.css";

export default compose(
  setDisplayName('ZeroResults'),
  withTheme(styles),

  connectItems,

  withProps(({ config, q }) => ({
    title: template(config.getIn(['i18n', 'noResult'], 'Noope'))(escape(q)),
  }))
)(view);
