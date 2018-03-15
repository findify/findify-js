import { defaultProps } from 'recompose';
import view from './view'
import theme from './styles.css';

export default defaultProps({ theme })(view);
