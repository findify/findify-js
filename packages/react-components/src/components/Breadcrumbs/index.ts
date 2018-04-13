import { compose, withHandlers, setDisplayName } from 'recompose';
import { connectBreadcrumbs } from '@findify/react-connect';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import styles from "./styles.css";
import view from './view';


export default compose(
  setDisplayName('Breadcrumbs'),
  withTheme(styles),
  connectBreadcrumbs
)(view);
