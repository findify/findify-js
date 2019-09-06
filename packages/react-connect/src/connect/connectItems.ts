import createConnect from './createConnect';
import { Item } from '../immutable/item';
import { Map } from 'immutable';

const patchItems = (analytics, meta) => item => new Item(item, meta, analytics);

/**
 * Used to connect to items field of response, which is subset of products,
 * enhance it with Analytics and pass down further the modified products
 */
const [hook, connect] = createConnect({
  field: 'items',
  mapProps: (items, meta, change, analytics) => ({
    items: items && items.map(patchItems(analytics, meta)) || Map()
  }),
})

export { hook, connect }