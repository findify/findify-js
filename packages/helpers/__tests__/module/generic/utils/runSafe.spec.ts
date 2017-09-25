import * as expect from 'expect';

import { runSafe } from '../../../../src/generic/utils/runSafe';

describe('utils runSafe', () => {
  it('should return function result if there is no errors', () => {
    const obj = {
      key: 'someValue',
    };

    expect(runSafe(() => obj.key)).toBe('someValue');
  });

  it('should return "undefined" if any excpetions are occured while function had been running', () => {
    const obj = {};
    expect(runSafe(() => (obj as any).key.a.b.c.d)).toBe(undefined);
  });
});
