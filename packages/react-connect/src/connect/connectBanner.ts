import createConnect from './createConnect';

/** Used to connect to banner field of Search API response */
const { hook, connect } = createConnect({
  field: 'banner',
});

export { hook, connect };
