import createConnect from './createConnect';

/**
 * Used to extract query field of Search API response,
 * and pass it down further via props
 */
export default createConnect({
  field: 'query',
})
