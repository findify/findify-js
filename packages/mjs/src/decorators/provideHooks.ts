import type from 'prop-types';
import { withContext, setDisplayName } from 'recompose';
import { isObject } from 'lodash';

const empty = {};

const reduceHooks = (hooks, context) =>
  Object.keys(hooks).reduce(
    (acc, key) =>
      key.includes(context) || key.includes('*')
        ? {
            ...acc,
            [key.replace(context + '.', '').replace('*.', '')]: hooks[key],
          }
        : acc,
    empty,
  );

const provideHooks = (context?: string): any =>
  withContext(
    { hooks: type.object, globalConfig: type.object, trackEvent: type.func },
    ({ hooks, config: globalConfig, trackEvent }) => ({
      hooks: !context
        ? hooks
        : !isObject(hooks) ? empty : reduceHooks(hooks, context),
      globalConfig,
      trackEvent,
    }),
  );

/**
 *  Allow get hooks from context in ui-components. hook key is [context].[hook],
 * it will split hooks for specific feature like mobile.facets & response.facets
 */
export default setDisplayName('provideHooks')(provideHooks);
