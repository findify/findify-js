import * as expect from 'expect';
import { joinParams } from '../../src/utils/joinParams';

describe('joinParams', () => {
  const assertionsData = [
    {
      args: ['http://site.com/test', 'hello=world'],
      expectingValue: 'http://site.com/test?hello=world',
    },
    {
      args: ['http://site.com/test/', 'hello=world'],
      expectingValue: 'http://site.com/test?hello=world',
    },
  ];

  assertionsData.forEach(item => {
    it(`should join url with given "${item.args[1]}" params`, () => {
      expect(joinParams.apply(null, item.args)).toBe(item.expectingValue);
    });
  });
});
