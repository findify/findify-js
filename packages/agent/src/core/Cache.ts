import { debounce } from 'lodash';

export class Cache {
  cache: any = {};
  resolver: any;

  constructor(resolver: () => void) {
    this.resolver = resolver;
    this.invalidate = this.invalidate.bind(this);
  }

  private invalidate() {
    this.resolver(this.cache);
    this.purge();
  }

  public set(field, value) {
    this.cache[field] = value;
    this.resolve();
  }

  public reset(field) {
    if (!field) {
      this.cache = {};
    } else {
      this.cache[field] = undefined;
    }
    this.resolve();
  }

  private purge() {
    this.cache = {};
  }

  public resolve = (debounce as any)(this.invalidate);
}
