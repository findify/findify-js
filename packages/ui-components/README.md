# Getting started
## Installation
```
npm install findify-ui-components --save
```
or
```
yarn add findify-ui-components
```

## Usage example
```javascript
import React from 'react';
import ReactDOM from 'react-dom';

var props = {
    config: {
        position: 'left',
        i18n: {
            suggestionsTitle: 'Search suggestions',
            productMatchesTitle: 'Product matches',
            tipTitle: 'Press enter to search'
        }
    },
    meta: {
        q: 'test query'
    },
    items: [{
        product_url: '/test',
        title: 'test',
        price: [200],
        thumbnail_url: 'http://placehold.it/100x100',
        compare_at: 150
    }],
    suggestions: [{
        value: 'test suggestion'
    }],
};

ReactDOM.render(<Autocomplete {...props} />, document.getElementById('autocomplete'));
```

# Documentation
- [API Reference](https://findify.readme.io/reference#initialization)
- [UI Components Playground](https://findify.github.io/ui-components)

# License
MIT
