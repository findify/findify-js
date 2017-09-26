# Getting started
## Installation
```
npm install @findify/helpers --save
```
or
```
yarn add @findify/helpers
```
Alternatively, you can use UMD builds, by requiring them to the page using `<script>` tag:
```
https://findify-assets-2bveeb6u8ag.netdna-ssl.com/helpers-js/findify-helpers.0.1.29.min.js
```
or using unminified version:
```
https://findify-assets-2bveeb6u8ag.netdna-ssl.com/helpers-js/findify-helpers.0.1.29.js
```

## Usage example
```javascript
var FindifyHelpers = require('@findify/helpers');

// First, you need to create one of store instances:
var searchStore = FindifyHelpers.createSearch({
  key: 'b9h348b89h439g43',
  // If you are using this library on a frontend, it will be convenient for you to provide user once on initialization.
  // You can get user object, using `@findify/analytics` library, or by manually getting data from cookies:
  user: {
    uid: 'f892hf2938f2g9p2',
    sid: 'g2984hg2jg9823g9'
  }
});

// After you can emit events
searchStore.emit({
  name: 'search',
  payload: {
    query: 'white t-shirt'
  }
}).emit({
  name: 'request',
});

// And subscribe on store changes
searchStore.subscribe(function(event) {
  if (event.name === 'request') {
    // handle requestBody data
    var requestBody = searchStore.get('request');
  }

  if (event.name === 'responseSuccess') {
    // handle responseBody data
    var responseBody = searchStore.get('response');
  }
});
```

# Documentation
- [API Reference](https://findify.readme.io/reference#initialization)

# License
MIT
