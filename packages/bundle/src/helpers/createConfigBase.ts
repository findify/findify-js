import { fromJS } from 'immutable';
import { format } from 'currency-formatter';

export const createConfigBase = (config) => fromJS(config)
  .set('currency', value => format(value, config.currency))
