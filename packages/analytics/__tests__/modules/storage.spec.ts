import * as expect from 'expect';
import * as rewire from 'rewire';
import { setupJsDom, teardownJsDom } from '../jsdom-helper';
import * as store from 'store';
import * as expire from 'store/plugins/expire';

store.addPlugin(expire);

const s = rewire('../../src/modules/storage');

const read = s.__get__('read');
const write = s.__get__('write');

// test through public interface

describe('storage', () => {
  beforeEach(setupJsDom);
  afterEach(teardownJsDom);

  describe('readStorage', () => {
    it('should return value if entry exists in localStorage', () => {
      store.set('key', 'someValue', (new Date().getTime() + 1000).toString());
      expect(read('key')).toEqual('someValue');
    });

    it('should return "undefined" if entry doesn`t exists in localStorage', () => {
      store.clearAll();
      expect(read('key')).toEqual(undefined);
    });

    it('should return "undefined" if entry expired', () => {
      store.set('key', 'someValue', (new Date().getTime() - 1000).toString());
      expect(read('key')).toEqual(undefined);
    });
  });

  // describe('writeStorage', () => {
  //   it('should write entry to localStorage', () => {
  //     write('key', 'someValue');
  //     expect(window.localStorage.getItem('key')).toEqual('someValue');
  //   });

  //   it('should write "name_" + _ttl entry to localStorage with lifetime timestamp', () => {
  //     write('key', 'someValue');
  //     expect(parseInt(window.localStorage.getItem('key_ttl'), 10)).toBeA('number');
  //   });

  //   it('should remove existing entry if "value" is not provided', () => {
  //     window.localStorage.setItem('key', 'someValue');
  //     window.localStorage.setItem('key_ttl', ((new Date()).getTime() + 1000).toString());

  //     write(1000, 'key');

  //     expect(window.localStorage.getItem('key')).toNotExist();
  //     expect(window.localStorage.getItem('key_ttl')).toNotExist();
  //   });

  //   it('should return "undefined" and do nothing if localStorage is disabled', () => {
  //     (window as any).localStorage = undefined;
  //     expect(write(1000, 'key', 'someValue')).toEqual(undefined);
  //   });
  // });
});
