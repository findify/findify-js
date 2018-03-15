import { defaultProps } from 'recompose';
import theme from './styles.css';
import view from './view';

export default defaultProps({ theme })(view)
