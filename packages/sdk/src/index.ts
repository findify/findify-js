import 'core-js/features/array/includes';

import debug from 'debug';
import { Config, Client } from './client';
import * as R from './request';
import { validateConfig } from './validation';
import * as settings from './settings';

const knownEnvs = ['development', 'staging', 'production'];

/** Default environment that would be used if nothing is set. */
const defaultEnv = 'production';
/** Current environment specified in `process.env.FINDIFY_ENV`. */
const findifyEnv =
  typeof process !== 'undefined' && process.env && process.env.FINDIFY_ENV;

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
export function init(config: Config) {
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
