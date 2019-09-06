import { Range } from 'immutable';
import createConnect from './createConnect';

/**
 * Used to extract pagination information from Search API response metadata
 * and pass it down further
 */
const [hook, connect] = createConnect({
  field: 'meta',
  mapProps: (meta) => ({
    pages: meta && Range(1, Math.ceil(meta.get('total') / meta.get('limit'))),
    current: meta && Math.ceil(meta.get('offset') / meta.get('limit')) + 1
  }),
  handlers: {
    getPageProps: ({ update, meta }) => (page) => ({
      key: page,
      onClick: (e) => {
        if (e) e.preventDefault();
        update('offset', (page - 1) * meta.get('limit'))
      }
    })
  }
})

export { hook, connect };
