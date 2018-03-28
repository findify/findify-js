
import { compose, setDisplayName, withPropsOnChange } from 'recompose';
import withTheme from 'helpers/withTheme';
import styles from './styles.css';
import view from './view';

const options = ['primary', 'secondary', 'uppercase', 'lowercase'];
const getClassName = props =>
  options
  .filter(i => Boolean(props[i]))
  .map((i, index) => index ? i.charAt(0).toUpperCase() + i.slice(1) : i)
  .join('');

export default compose<any, any>(
  setDisplayName('Text'),
  withTheme(styles),
  withPropsOnChange(options, (props) => ({ size: getClassName(props) }))
)(view);
