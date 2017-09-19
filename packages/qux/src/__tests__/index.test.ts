import { qux, kek, blah } from '..';

test('my passing test', () => {
  expect(qux(2)).toBe(-5);
  expect(kek(5)).toBe(3);
  expect(blah(2)).toBe(0);
});
