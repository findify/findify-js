import { debounce } from '../utils/helpers';
import { Map } from 'immutable';

const _initial = Map();

export class Cache {
  cache: any = _initial;
  resolver: any;

  constructor(resolver: (store) => void) {
    this.resolver = resolver;
    this.invalidate = this.invalidate.bind(this);
  }

  public invalidate() {
    this.resolver(this.cache);
    this.purge();
  }

  public set(field, value) {
    this.cache = this.cache.set(field, value);
    this.resolve();
  }

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
