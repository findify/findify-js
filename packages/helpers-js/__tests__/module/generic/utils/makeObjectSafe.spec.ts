import * as expect from 'expect';

import { makeObjectSafe } from '../../../../src/generic/utils/makeObjectSafe';

describe('utils makeObjectSafe', () => {
  const obj = {
    a: 'a',
    b: 'b',
  };

  const assertionsData = [
    {
      arg: {
        key: 'someValue',
        key2: 'someValue2',
        key3: undefined,
        key4: undefined,
        key5: () => (obj as any).a.b.c.d.e,
      },
      expectingValue: {
        key: 'someValue',
        key2: 'someValue2',
      },
    },
    {
      arg: {
        key: 'someValue',
        key2: 'someValue2',
        key3: () => obj.a,
      },
      expectingValue: {
        key: 'someValue',
        key2: 'someValue2',
        key3: obj.a,
      },
    },
    {
      arg: {
        key: undefined,
      },
      expectingValue: {},
    },
    {
      arg: {},
      expectingValue: {},
    },
  ];

  assertionsData.forEach(item => {
    it(`should make object by given "${JSON.stringify(
      item.arg,
    )}" constructor object`, () => {
      expect(makeObjectSafe(item.arg)).toEqual(item.expectingValue);
    });
  });
});
