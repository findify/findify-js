import * as expect from 'expect';
import { resolveUrl } from '../../src/utils/resolveUrl';

describe('resolveUrl', () => {
  const assertionsData = [
    {
      args: ['http://site.com', 'test/test2'],
      expectingValue: 'http://site.com/test/test2',
    },
    {
      args: ['http://site.com/', 'test/test2'],
      expectingValue: 'http://site.com/test/test2',
    },
    {
      args: ['http://site.com', '/test/test2'],
      expectingValue: 'http://site.com/test/test2',
    },
    {
      args: ['http://site.com/', '/test/test2'],
      expectingValue: 'http://site.com/test/test2',
    },
  ];

  assertionsData.forEach(item => {
    it(`should resolve url by given "${item.args}" params`, () => {
      expect(resolveUrl.apply(null, item.args)).toBe(item.expectingValue);
    });
  });
});
