import { connectConfig } from '@findify/react-connect';
import { compose, setDisplayName } from 'recompose';
import withTheme from 'helpers/withTheme';
import view from './view';
import styles from "./styles.css";

export default compose(
  setDisplayName('GridRecommendation'),
  withTheme(styles),
  connectConfig
)(view);
