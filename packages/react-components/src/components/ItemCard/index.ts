import { defaultProps } from 'recompose';
import view from './view'
import theme from './styles.css';

console.log(defaultProps);

export default defaultProps({ theme })(view);
