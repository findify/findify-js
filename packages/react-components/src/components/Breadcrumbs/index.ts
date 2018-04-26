import { compose, withHandlers, setDisplayName } from 'recompose';
import { connectBreadcrumbs } from '@findify/react-connect';
import withEvents from 'helpers/withEvents';
import withTheme from 'helpers/withTheme';

import styles from 'components/Breadcrumbs/styles.css';
import view from 'components/Breadcrumbs/view';


export default compose(
  setDisplayName('Breadcrumbs'),
  withTheme(styles),
  connectBreadcrumbs
)(view);
