import { configure, setAddon, addDecorator } from '@kadira/storybook';
import infoAddon from '@kadira/react-storybook-addon-info';
import '../src/styles.global.css';

function loadStories() {
  require('../dev/stories/Product');
  require('../dev/stories/ProductsList');
  require('../dev/stories/ProductsCarousel');
  require('../dev/stories/Facets');
  require('../dev/stories/FacetsList');
  require('../dev/stories/Autocomplete');
  require('../dev/stories/Pagination');
  require('../dev/stories/Sorting');
  require('../dev/stories/Rating');
  require('../dev/stories/Breadcrumbs');
}

setAddon(infoAddon);
configure(loadStories, module);
