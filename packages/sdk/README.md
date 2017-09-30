# Findify JavaScript SDK

The Findify JavaScript SDK is a lightweight, promise based interface to
to [Findify v3 search API](https://findify.readme.io/v3/reference#search-api) that works
in both nodejs and browser environments.

## Table of Contents

- [Documentation](#documentation)
- [Quickstart](#quickstart)
- [Examples](#examples)
- [Versioning](#versioning)
- [Getting help](#getting-help)
- [Contributing](#contributing)

## Documentation

The full documentation can be found here:
<https://findify.readme.io/v3/reference#js-sdk-introduction>

For release notes, see the [CHANGELOG](./CHANGELOG.md).

## Quickstart

### In the Browser

To use the SDK in the browser, simply add the following script tag to your
HTML pages:

```
<script src="https://findify-assets-2bveeb6u8ag.netdna-ssl.com/js-sdk/findify-sdk.2.0.0.min.js"></script>
```

if you want unminified version:

```
<script src="https://findify-assets-2bveeb6u8ag.netdna-ssl.com/js-sdk/findify-sdk.2.0.0.js"></script>
```

### In Node.js

Install the SDK using [npm](http://npmjs.org):
```console
$ npm install --save @findify/sdk
```
or [yarn](https://yarnpkg.com/lang/en/)
```console
$ yard add @findify/sdk
```

The Findify SDK for JavaScript bundles TypeScript definition files for use in TypeScript projects and to support tools that can read `.d.ts` files.
Our goal is to keep these TypeScript definition files updated with each release for any public api.

### Using Bower

You can also use [bower](http://bower.io) to install the SDK by typing the
following into a terminal window:

```sh
bower install @findify/sdk
```

## Examples

```javascript
var FindifySDK = require('@findify/sdk');

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

See [examples/](./examples/) for working examples of how the SDK can be used
in a few different environments.

## Versioning

We will try to follow [semver](http://semver.org/) as close as possible.
That means bug fixes will be patch releases (1.0.1 -> 1.0.2), additional
functionality like new endpoints will be minor releases (1.0.1 -> 1.1.0)
and breaking changes to both the library and the API endpoints it hits,
will be major releases (1.0.1 -> 2.0.0).

## Getting help

We use the GitHub issues for tracking bugs and feature requests.

 * Ask a question on [StackOverflow](https://stackoverflow.com/) and tag it with `findify-sdk`
 * Come join the Findify JavaScript community on [gitter](https://gitter.im/findify-js?source=orgpage)
 * If it turns out that you may have found a bug, please [open an issue](https://github.com/findify/findify-js/issues/new)

## Opening Issues

If you encounter a bug with the Findify SDK for JavaScript we would like to hear
about it. Search the [existing issues](https://github.com/findify/findify-js/issues)
and try to make sure your problem doesn’t already exist before opening a new
issue. It’s helpful if you include the version of the SDK, Node.js or browser
environment and OS you’re using. Please include a stack trace and reduced repro
case when appropriate, too.

The GitHub issues are intended for bug reports and feature requests. For help
and questions with using the Findify SDK for JavaScript please make use of the
resources listed in the [Getting help](https://github.com/findify/findify-js/tree/master/packages/sdk#getting-help)
section.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to
contribute, setup the development environment and run tests.
