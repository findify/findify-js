import * as expect from 'expect';

import { isExists } from '../../../../src/generic/utils/isExists';

describe('utils isExists', () => {
  const obj = {
    key: 'someValue',
  };

  it('should return "true" if object property is exists', () => {
    expect(isExists(obj.key)).toBeTruthy();
  });

  it('should return "false" if object property not exists', () => {
    expect(isExists((obj as any).otherKey)).toBeFalsy();
  });
});
