export const omit = <TR>(ks: string[], original: object) =>
  Object.keys(original)
    .filter((k) => !ks.includes(k))
    .reduce((filtered, k) => Object.assign(original, { [k]: original[k] }), {});

type RetryCallback = () => Promise<any>;

export const generateRID = (() => {
  let rid = 1;
  return () => rid++ && String(rid);
})();

const failureTreshold = 3
const retryTime = 180000 // 3 minutes;

const updateCircuitBreakerStatus = (failureCount: number, key: string) => {
  sessionStorage.setItem(key, JSON.stringify({ failureCount, lastFailureDate: new Date() }))
}

const doRequest = (attempt: number = 0, fn: RetryCallback, key: string) => {
  return fn().catch((err) => {
    const failureCount = attempt + 1
    updateCircuitBreakerStatus(failureCount, key);
    if (!err || failureCount >= failureTreshold) throw err;
    return doRequest(failureCount, fn, key);
  })
}

/**
 * 
 * @param key widgetId + MerchantId - key of the session storage value
 * @returns failureCount and lastFailureDate of the matched key
 */
const getCircuitBreakerStatus = (key: string): { failureCount: number; lastFailureDate: Date; } => {
  const findifyCircuitBreaker = sessionStorage.getItem(key);
  return findifyCircuitBreaker ? JSON.parse(findifyCircuitBreaker) : { failureCount: null, lastFailureDate: null };
}

const tryAgainCheck = (lastFailure) => {
  const lastAttempt = new Date(lastFailure);
  const now = new Date();
  return now.getTime() - lastAttempt.getTime() >= retryTime
}

const blockRequest = (failureCount: number, lastFailureDate: Date) =>
  failureCount >= failureTreshold && !tryAgainCheck(lastFailureDate)

const clearCircuitBreakerStatus = (key) => {
  sessionStorage.removeItem(key);
}

/**
 * 
 * @param fn Request to execute
 * @param key ${merchantId}_${widgetId} for session storage
 * @returns 
 */
export const requestHandler = (fn: RetryCallback, key) =>
  new Promise((resolve, reject) => {
    const { failureCount, lastFailureDate } = getCircuitBreakerStatus(key);
    if (blockRequest(failureCount, lastFailureDate)) return reject('Too many attemps, please try again');
    doRequest(failureCount, fn, key)
      .then((result) => {
        clearCircuitBreakerStatus(key);
        return resolve(result);
      })
      .catch((err) => reject(err))
  });