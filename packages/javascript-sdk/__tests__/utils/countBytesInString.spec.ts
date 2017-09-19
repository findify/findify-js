import * as expect from 'expect';
import { countBytesInString } from '../../src/utils/countBytesInString';

describe('countBytesInString', () => {
  const assertionsData = [
    {
      arg: '1 a ф № @ ®',
      expectingValue: 15,
    },
    {
      arg: 'ࠀ',
      expectingValue: 3,
    },
    {
      arg: 'κόσμε',
      expectingValue: 11,
    },
  ];

  assertionsData.forEach(item => {
    it(`should count bytes in "${item.arg}" string`, () => {
      expect(countBytesInString(item.arg)).toBe(item.expectingValue);
    });
  });
});
