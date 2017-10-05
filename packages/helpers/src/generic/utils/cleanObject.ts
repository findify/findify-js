import reduce = require('lodash/reduce');
import assign = require('lodash/assign');

export function cleanObject(obj: InputObject) {
  return reduce(
    obj,
    (acc: InputObject, value: any, key: string) =>
      typeof value === 'undefined'
        ? acc
        : assign({}, acc, {
            [key]: value,
          }),
    {}
  );
}

export type InputObject = {
  [key: string]: any;
};
