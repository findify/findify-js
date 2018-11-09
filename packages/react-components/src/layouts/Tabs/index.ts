import withTheme from 'helpers/withTheme';
import { compose, setDisplayName } from 'recompose';
import view from 'layouts/Tabs/view';
import styles from 'layouts/Tabs/styles.css';

const Tabs = compose(
  setDisplayName('Tabs'),
  withTheme(styles)
)(view);

export default process.env.HOT
  ? require('react-hot-loader').hot(module)(Tabs)
  : Tabs;
