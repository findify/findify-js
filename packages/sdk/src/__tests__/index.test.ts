import { init } from '..';

test('example test', () => {
  const config = { x: 1 };
  expect(init(config)).toBe(config);
});
