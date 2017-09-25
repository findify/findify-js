import * as expect from 'expect';

import { cleanObject } from '../../../../src/generic/utils/cleanObject';

describe('utils cleanObject', () => {
  const assertionsData = [
    {
      arg: {
        key: 'someValue',
        key2: 'someValue2',
        key3: undefined,
        key4: undefined,
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
      },
      expectingValue: {
        key: 'someValue',
        key2: 'someValue2',
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
    it(`should filter "${JSON.stringify(
      item.arg,
    )}" object from "undefined" properties`, () => {
      expect(cleanObject(item.arg)).toEqual(item.expectingValue);
    });
  });
});
