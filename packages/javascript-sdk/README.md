# Getting started
## Installation
```
npm install findify-sdk --save
```
or
```
yarn add findify-sdk
```
Alternatively, you can use UMD builds, by requiring them to the page using `<script>` tag:
```
https://findify-assets-2bveeb6u8ag.netdna-ssl.com/js-sdk/findify-sdk.1.3.6.min.js
```
or using unminified version:
```
https://findify-assets-2bveeb6u8ag.netdna-ssl.com/js-sdk/findify-sdk.1.3.6.js
```

## Usage example
```javascript
var FindifySDK = require('findify-sdk');

// First, you need to initialize library:
var client = FindifySDK.init({
  key: 'your_api_key',
  // If you are using this library on a frontend, it will be convenient for you to provide user once on initialization.
  // You can get user object, using `findify-analytics` library, or by manually getting data from cookies:
  user: {
    uid: 'user_id',
    sid: 'session_id'
  }
});

// After library initialized, we can send requests to server with `client` instance. Let's perform autocomplete request:
client.autocomplete({
  q: 'Red jacket',
  // If you are using this library on server, you will need to deal with multiple users objects.
  // In this case, you need to provide `user` object on each request. If you provided `user` on init, it will be overrided:
  user: {
    uid: 'user_id',
    sid: 'session_id'
  }
}).then(function(response) {
  // `response` variable will contain all response data from server, which could be later provided to the view layer.
});
```

# Documentation
- [API Reference](https://findify.readme.io/reference#initialization)

# License
MIT
