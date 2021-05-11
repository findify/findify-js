/**
 * @module components/Dropdown
 */
import Loadable from 'react-loadable';
import chunks from 'helpers/chunks';
import 'layouts/Recommendation/Slider/styles.global.css';

export default Loadable({
  loader: chunks.recommendation.slider,
  loading: () => null,
});
