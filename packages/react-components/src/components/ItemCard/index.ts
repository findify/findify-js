import { defaultProps } from 'recompose';
import view from 'components/ItemCard/view';
import theme from 'components/ItemCard/styles.css';

export default defaultProps({ theme })(view);
