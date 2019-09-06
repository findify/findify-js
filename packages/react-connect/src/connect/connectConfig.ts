import createConnect from './createConnect';

/**
 * Used to connect to MJS Configuration for the particular module and pass it down
 */
const [hook, connect] = createConnect({
  field: 'config',
})

export { hook, connect }