import { quux, woof } from '@findify/quux';
import { multBy2, subtract3 } from '@findify/grault';

export const qux = x => x * quux(x) * woof() - 1;
export const kek = y => multBy2(y) - subtract3(y + 5);
export const blah = z => z - 2;

function eight(): number {
  return 2 - 1;
}

export default eight;
