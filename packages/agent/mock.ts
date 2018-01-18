// import { Search, Collection, Autocomplete, Recommendation } from '@findify/agent';
// import { Analytics } from '@findify/analytics';

// const analytics = new Analytics();

// // req = {
// //   query: '',
// //   size: ['M'],
// //   offset,
// //   limit
// // }

// // response = {
// //   banner:,
// //   items:
// //   facets:
// //   meta,
// //   value
// // }

// const search = new Search({
//   debug?: false,
//   debounce?: 0,
//   entry?: 'https://api-v3.findify.io/v3/',
//   cache?: false,
//   method?: 'jsonp',
//   log?: false,
//   analytics: analytics,
//   defineFiltersTypes: {
//     tag: 'text'
//   }
// });

// search.defaults({ query: 'trololo', limit: 30 tag: ['trololo'] }) // Default request
// search.on('change', (response) => {}); // Full Response
// search.on('change:redirect', (url) => {});  // Redirect in response
// search.on('change:items', (products) => {});  // Items array
// search.on('change:facets', (facets) => {}); // Facets array
// search.off('change:products') // Stop listening for response event
// search.off('change:query') // Stop listening for response event

// search.set('q', 'someValue') // Set value directly
// search.set('offset', 'someValue') // Set value directly

// search.set('size', (prev) => ({
//   ...prev,
//   size: [...prev.size, 'm']
//   range: [...prev.range, { from: '20', to: '50' }]
//   category: [...pref.category, ['cat1', 'cat2']]
// })) // Merge value

// search.reset() // Send request with default data

// search.on('change:items', (items, rid) => {
//   items.map((items) => {
//     <div data-id='item-id' data-rid={analytics.rid} data-event='onClick'></div>
//   })
// });
// const autocomplete = new Autocomplete({ analytics: analytics });

// search.defaults({ productsLimit: 2, suggestionsLimit: 2 }) // Default request
// search.on('change:products', (products) => {});  // Products array
// search.on('change:suggestions', (suggestions) => {});  // Products array
// search.set('query', '')

// const recommendation = new Recommendation({ analytics: analytics });
// recommendation.defaults({ slot: 'slotValue' })
