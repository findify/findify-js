import { debounce } from 'lodash';

export class Cache {
  cache: any = {};
  resolver: any;

  constructor(resolver) {
    this.resolver = resolver;
  }

  set(field, value) {
    this.cache[field] = { ...this.cache[field], ...value };
    this.resolve();
  }

  resolve = debounce(() => {
    this.resolver(this.cache);
    this.purge();
  });

  purge() {
    this.cache = {};
  }
}
