import 'core-js/fn/object/entries';
import 'core-js/fn/promise';

export const omit = <TR>(ks: string[], o: object) =>
  Object.entries(o)
    .filter(([k]) => !ks.includes(k))
    .reduce((o, [k, v]) => Object.assign(o, { [k]: v }), {});

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
