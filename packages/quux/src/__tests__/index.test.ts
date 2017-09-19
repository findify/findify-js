import { zero, quux, woof } from '..';

test('my passing test', () => {
  expect(zero()).toBe(0);
  expect(quux(2)).toBe(2);
  expect(woof()).toBe(-1);
});
