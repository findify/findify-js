import { Autocomplete } from '../src';

const autocomplete = new Autocomplete({
  key: '8a2c6a1e-1aac-4047-8514-f284203c4b59',
  debounce: 1000,
  user: {
    uid: '1',
    sid: '1',
  },
});

autocomplete
  .defaults({ q: 'black' })
  .on('change:query', (suggestions, meta) => {
    meta;
  });

setTimeout(() => {
  autocomplete.set('q', 'white');
}, 100);

setTimeout(() => {
  autocomplete.set('q', 'orange');
}, 100);
