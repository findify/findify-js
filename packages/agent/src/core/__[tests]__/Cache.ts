import { Cache } from '../Cache';
import { defer } from 'lodash';

const mockObject = { '1': 1, '2': 2 };

describe('Cache', () => {
  let store = void 0;
  const cache = new Cache(c => (store = c));

  it('Invalidates cache after next tick', () => {
    cache.set(1, 1);
    cache.set(2, 2);
    expect(store).toBe(undefined);
  });

  it('Should invalidate cache immediately', () => {
    cache.set(1, 1);
    cache.set(2, 2);
    cache.invalidate();
    expect(store).toEqual(mockObject);
  });
});
