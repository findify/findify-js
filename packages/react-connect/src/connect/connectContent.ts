import createConnect from './createConnect';
import { List, Map } from 'immutable';

type Items = {
  /** List of items */
  items: List<Map<any, any>>;
};

/**
 * Used to connect to items field of response, which is subset of products,
 * enhance it with Analytics and pass down further the modified products
 */
const { hook, connect } = createConnect<Items>({
  field: 'items',
  mapProps: (items) => ({
    items: items?.map(Map) || List(),
  }),
});

export { hook, connect };
