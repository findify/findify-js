import createConnect from './createConnect';
import { Item } from '../immutable/item';

const patchItems = (analytics, meta) => item => new Item(item, meta, analytics);

export default createConnect({
  field: 'items',
  mapProps: (items, meta, change, analytics) => ({
    items: items && items.map(patchItems(analytics, meta))
  }),
})
