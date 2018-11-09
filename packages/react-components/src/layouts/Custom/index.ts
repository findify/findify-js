import { compose, setDisplayName } from 'recompose';
import view from 'layouts/Custom/view';
import withTheme from 'helpers/withTheme';
import styles from "layouts/Custom/styles.css";

export default compose(
  setDisplayName('CustomLayout'),
  withTheme(styles)
)(view);
