import createConnect from './createConnect';
import { Item } from '../immutable/item';
import { Content } from '../immutable/content';
import { List } from 'immutable';

const patchItems = (analytics, meta) => (item) => {
  const Factory = item.get('product_url') ? Item : Content;
  return new Factory(item, meta, analytics);
};

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
    items: (items && items.map(patchItems(analytics, meta))) || List(),
  }),
});

export { hook, connect };
