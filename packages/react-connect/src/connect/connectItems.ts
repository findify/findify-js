import createConnect from './createConnect';
import { Item } from '../immutable/item';
import { List, Map } from 'immutable';

const patchItems = (analytics, meta) => (item) =>
  new Item(item, meta, analytics);

type Items = {
  /** List of items */
  items: List<Item>;
};

/**
 * Used to connect to items field of response, which is subset of products,
 * enhance it with Analytics and pass down further the modified products
 */
const { hook, connect } = createConnect<Items>({
  field: 'items',
  mapProps: (items, meta, change, analytics) => ({
    items: (items && items.map(patchItems(analytics, meta))) || Map(),
  }),
});

export { hook, connect };
