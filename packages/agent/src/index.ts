import { Agent } from './core/Agent';
import * as Types from './types';

export class Search extends Agent{
  type = Types.RequestType.Search
}

export class Autocomplete extends Agent{
  type = Types.RequestType.Autocomplete
}

export class Recommendation extends Agent{
  type = Types.RequestType.Recommendation
}

export class SmartCollection extends Agent{
  type = Types.RequestType.SmartCollection
}

const autocomplete = new Autocomplete({
  key: '8a2c6a1e-1aac-4047-8514-f284203c4b59',
  debounce: 1000,
  user: {
    uid: '1',
    sid: '1'
  }
});

autocomplete
  .defaults({ q: 'black' })
  .on('change:query', (suggestions, meta) => {
    meta
  })

setTimeout(() => {
  autocomplete.set('q', 'white')
}, 100);

setTimeout(() => {
  autocomplete.set('q', 'orange')
}, 100);
