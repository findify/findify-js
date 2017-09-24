import PropTypes from 'prop-types';
import { withContext } from 'recompose';

export default withContext({ location: PropTypes.object }, ({ location }) => ({
  location,
}));
