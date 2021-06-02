/**
 * @module components/Dropdown
 */
import Loadable from 'react-loadable';
import chunks from 'helpers/chunks';

export default Loadable({
  loader: chunks.components.swiper,
  loading: () => null,
});
