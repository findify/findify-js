import * as React from 'react';
import { render } from 'react-dom';
import { compose, withState } from 'recompose';

import { Autocomplete, Search, Recommendations } from '../src/components';
import '!!style-loader!css-loader!findify-ui-components/dist/styles.css';

const RecommendationsConfig = {
  api: {
    key: '2e963f3e-38bd-4c00-9636-c00e48945eb7',
    user: {
      uid: '111',
      sid: '111',
    },
  },
  enabled: true,
  slot: 'home-findify-rec-3',
  template: 'slider',
  productsToShow: 3,
  minResultsToShow: 1,
  limit: 3,
};

const SearchConfig = {
  ...require('./exampleConfig').default.features.search,
  currency: {
    ...require('./exampleConfig').default.currency,
  },
  api: {
    key: '2e963f3e-38bd-4c00-9636-c00e48945eb7',
    user: {
      uid: '111',
      sid: '111',
    },
  },
  styles: {
    autocomplete: {
      suggestions: {
        fontFamily: 'Palatino',
        color: '#333',
      },
    },
    search: {
      product: {
        main: {
          fontFamily: 'Palatino',
          fontSize: 12,
          textTransform: 'uppercase',
          textAlign: 'center',
        },
        title: {
          color: '#eee',
        },
        description: {
          color: '#eee',
        },
        price: {
          main: {
            fontFamily: 'Palatino',
            fontSize: 12,
          },
          regular: {
            color: '#fff',
          },
          discount: {
            color: '#333',
          },
        },
      },
      facets: {
        title: {
          fontFamily: 'Palatino',
          color: '#333',
        },
        item: {
          color: '#333',
        },
        active: {
          color: 'yellow',
        },
      },
    },
  },
};

const AutocompleteConfig = {
  api: {
    key: '2e963f3e-38bd-4c00-9636-c00e48945eb7',
    user: {
      uid: '111',
      sid: '111',
    },
  },
  styles: {
    autocomplete: {
      suggestions: {
        fontFamily: 'Palatino',
        color: '#333',
      },
    },
  },
};

const App = compose(withState('node', 'setNode', null))(({ node, setNode }) => (
  <div>
    <input type="search" ref={r => r && !node && setNode(r)} />
    {node && (
      <Autocomplete
        config={AutocompleteConfig}
        node={node}
        inline
        onChange={console.log}
      />
    )}
    <Search
      config={SearchConfig}
      inline
      onChange={console.log}
      request={{ q: 'anna' }}
    />
  </div>
));

const initialize = () => render(<App />, document.getElementById('root'));

if (
  ['complete', 'loaded', 'interactive'].includes(document.readyState) &&
  document.body
) {
  initialize();
} else {
  document.addEventListener('DOMContentLoaded', initialize, false);
}
