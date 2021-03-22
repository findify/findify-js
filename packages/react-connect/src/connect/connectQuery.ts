import createConnect from './createConnect';

/**
 * Used to extract query field of Search API response,
 * and pass it down further via props
 */
const { hook, connect } = createConnect({
  field: 'query',
});

export { hook, connect };
