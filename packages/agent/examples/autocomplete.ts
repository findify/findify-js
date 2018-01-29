import { Autocomplete, Search } from '../src';

const autocomplete = new Search({
  key: '8a2c6a1e-1aac-4047-8514-f284203c4b59',
  user: {
    uid: '1',
    sid: '1',
  },
});

autocomplete
  .defaults({ q: 'black', filters: { color: ['black', 'white'] }})
  .set('q', 'white')
  .set('filters', (f) => ({
    ...f,
    price: [{ from: 1, to: 20 }]
  }))
  .on('change:suggestions', (suggestions, meta) => {
    meta;
  });

setTimeout(() => {
  autocomplete.set('q', 'orange');
}, 100);
