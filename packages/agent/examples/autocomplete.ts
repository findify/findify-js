import { Autocomplete, Search } from '../src';

const autocomplete = new Search({
  key: '8a2c6a1e-1aac-4047-8514-f284203c4b59',
  user: {
    uid: '1',
    sid: '1',
  },
});

autocomplete
  .defaults({ q: 'black', filters: { color: ['white'] }})
  .set('q', 'white')
  .set('filters', { color: ['black'] })
  .on('change:query', (suggestions, meta) => {
    meta;
  })
  .on('change:items', (suggestions, meta) => {
    meta;
  })
  .reset();

setTimeout(() => {
  autocomplete.set('q', 'orange');
}, 100);
