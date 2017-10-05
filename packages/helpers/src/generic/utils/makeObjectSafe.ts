import mapValues = require('lodash/mapValues');

import { cleanObject } from './cleanObject';
import { runSafe, InputFunction as RunSafeInputFunction } from './runSafe';

export function makeObjectSafe(constructor: Constructor) {
  return cleanObject(
    mapValues(
      constructor,
      (f: RunSafeInputFunction) => (typeof f !== 'function' ? f : runSafe(f))
    )
  );
}

export type Constructor = {
  [key: string]: RunSafeInputFunction | any;
};
