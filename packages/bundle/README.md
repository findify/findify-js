![npm](https://img.shields.io/npm/v/@findify/bundle)
[![](https://data.jsdelivr.com/v1/package/npm/@findify/bundle/badge)](https://www.jsdelivr.com/package/npm/@findify/bundle)

# @findify/bundle

## Installation

Bundle is an Out-of-the-box solution which is intended to work in browser by including script tag on the web page.
Findify compiles `bundle.js`, includes store configuration for merchants and serves this file from private CDN.

In the case you like to manage everything by your self - check how we setting environment in the [@findify/cli](https://github.com/findify/findify-js/tree/develop/packages/cli) package

## Development 🚀 

```bash
yarn build:dll # Build DLL once you changed deps.
yarn start # Run devserver on http://localhost:3000
```

## Variables 🔓
```bash

__MERCHANT_API_KEY__ # Store API key
__MERCHANT_VERSION__ # Bundle version
__MERCHANT_CSS__ # Path to custom CSS file
__INCLUDE_POLYFILL__ # Should use polyfill or not
__ENVIRONMENT__ 'prod|stage' # Environment
__DISABLE_SENTRY__ # Should report errors to Findify
__SENTRY_ENABLED__ # Same as above
__MERCHANT_ID__ # ID of merchant
```

## License (MIT) 🎁
