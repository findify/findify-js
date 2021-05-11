import { Map } from 'immutable';
import createConnect from './createConnect';

type Banner = {
  /**
   * Returns banner specific props
   */
  banner: Map<string, any>;
};

/** Used to connect to banner field of Search API response */
const { hook, connect } = createConnect<Banner>({
  field: 'banner',
});

export { hook, connect };
