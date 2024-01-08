import debug from 'debug';
import { Client, Config } from './client';
import * as R from './request';
import * as settings from './settings';
import { validateConfig } from './validation';
export { Type as RequestType } from './request/Type';

const knownEnvs = ['development', 'staging', 'production'];

/** Default environment that would be used if nothing is set. */
const defaultEnv = 'production';
/** Current environment specified in `process.env.FINDIFY_ENV`. */
const findifyEnv = (() => {
  try {
    return process.env.FINDIFY_ENV;
  } catch {
    return defaultEnv;
  }
})();

const env = findifyEnv || defaultEnv;

if (!knownEnvs.includes(env)) {
  throw new Error(`${env} is not supported environment`);
}

/** Environment-dependent default settings */
const defaults = settings[env];

/**
 * Initializes the SDK.
 * @param config SDK configuration options.
 * @returns Client instance, which could be used further
 * for sending requests to the server.
 */
export function init(config: Config): Client {
  const isBrowserEnv = typeof window !== 'undefined';
  debug('sdk')('env: ', env);
  debug('sdk')('defaults: ', defaults);
  debug('sdk')('isBrowserEnv: ', isBrowserEnv);
  const cfg = setDefaults(config, isBrowserEnv);
  validateConfig(cfg, isBrowserEnv);
  return new Client(cfg);
}

const setDefaults = (cfg: Config, isBrowserEnv: boolean) => ({
  method: isBrowserEnv ? R.Method.JSONP : R.Method.POST,
  ...defaults,
  ...cfg,
});
