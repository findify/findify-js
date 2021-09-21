import createConnect from './createConnect';
import { List } from 'immutable';
import { Content } from '../immutable/content';

const patchItems = (analytics, meta) => (item) =>
  new Content(item, meta, analytics);

type Items = {
  /** List of items */
  items: List<Content>;
};

/**
 * Connect content field and return Content Record for each
 * to use in autocomplete - specify field eq: useContent("content.blogs")
 */
const { hook, connect } = createConnect<Items>({
  field: 'items',
  mapProps: (items, meta, change, analytics) => ({
    items: (items && items.map(patchItems(analytics, meta))) || List(),
  }),
});

export { hook, connect };
