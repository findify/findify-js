import { debounce } from '../utils/helpers';
import { Map } from 'immutable';

const _initial = Map();

/**
 * The main idea behind Cache is ability to keep
 * latest request state, which lead to current response
 * We may use this in Agent for validating, whether we need to run a request,
 * whether the request state has changed and how did it change
 */
export class Cache {
  cache: any = _initial;
  resolver: any;

  constructor(resolver: (store) => void) {
    this.resolver = resolver;
    this.invalidate = this.invalidate.bind(this);
  }

  /**
   * Forces re-caching and clears the cache
   */
  public invalidate() {
    this.resolver(this.cache);
    this.purge();
  }

  /**
   * Used to cache new request parameter
   * @param field field to cache
   * @param value value to cache
   */
  public set(field, value) {
    this.cache = this.cache.set(field, value);
    this.resolve();
  }

  /**
   * Resets cache field to initial value, and then forces re-caching
   * If no field is provided, resets the cache to pre-initialized empty immutable.Map()
   * @param field field to reset
   */
  public reset(field) {
    if (!field) {
      this.cache = _initial;
    } else {
      this.cache = this.cache.delete(field);
    }
    this.resolve();
  }

  private purge() {
    this.cache = _initial;
  }

  public resolve = debounce(this.invalidate);
}
