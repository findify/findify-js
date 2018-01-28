import 'core-js/fn/array/includes';
import 'core-js/es6/promise';

export const omit = <TR>(ks: string[], o: object) =>
  Object.keys(o)
    .filter((k) => !ks.includes(k))
    .reduce((o, k) => Object.assign(o, { [k]: o[k] }), {});

type RetryCallback = () => Promise<object>;

export const retryTimes = (n: number, fn: RetryCallback) =>
  new Promise((resolve, reject) =>
    retry(n, fn)
      .then(result => resolve(result))
      .catch(err => reject(err))
  );

const retry = (i: number, fn: RetryCallback) =>
  fn().catch(err => {
    if (i <= 0) throw err;
    return retry(i - 1, fn);
  });
