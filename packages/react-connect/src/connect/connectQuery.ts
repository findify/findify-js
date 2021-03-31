import createConnect from './createConnect';

type Query = {
  /**
   * Returns request meta
   */
  query: Map<string, any>;
};

/**
 * Used to extract query field of Search API response,
 * and pass it down further via props
 */
const { hook, connect } = createConnect<Query>({
  field: 'meta',
  mapProps: (_, meta) => ({ query: meta }),
});

export { hook, connect };
