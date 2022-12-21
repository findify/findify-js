[![npm (scoped)](https://img.shields.io/npm/v/@findify/analytics.svg)](https://www.npmjs.com/package/@findify/analytics)

# @findify/analytics

## Overview

Findify Analytics helps you integrate our Feedback API on the website and
gather all the user behavior analytics that our ML and personalization platform require.

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->


- [Installation](#installation)
- [:boom: Upgrading from v1.1.x to v2.0.14](#boom-upgrading-from-v11x-to-v2014)
- [:boom: Upgrading from 2.0.x to 3.0.x](#boom-upgrading-from-20x-to-30x)
- [Usage example](#usage-example)
- [Versioning](#versioning)
- [Getting help](#getting-help)
- [Opening Issues](#opening-issues)
- [Contributing](#contributing)
- [Documentation](#documentation)
- [License](#license)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Installation

Install the analytics package using [npm](http://npmjs.org):

```
npm install @findify/analytics --save
```

or [yarn](https://yarnpkg.com/lang/en/)

```console
yarn add @findify/analytics
```

Alternatively, you can use UMD builds, by requiring them to the page using `<script>` tag.
To use the analytics in the browser, simply add the following script tag to your HTML pages:

```
<script src="https://cdn.jsdelivr.net/npm/@findify/analytics@latest/dist/findify-analytics.jss"></script>
```


## :boom: Upgrading from v1.1.x to v2.0.14

Upgrading to `v2.0.x` introduces *breaking changes*,
due to the fact that the internal implementation of analytics has been almost completely rewritten.
So you would need to make changes accordingly.

The goal of this rewrite was to address a lot of issues that have plagued analytics since its initial release. We have done our best to make analytics v2 as API compatible with v1.x as possible, however there are some breaking changes that we decided we needed to make, intentionally, in order to support the new architecture and also improve the usability of the library long-term.

In this guide, we will go over the braking changes and how to upgrade your code to address them. Hopefully this will make your upgrade path that much easier. If during the upgrade you run into any issues, feel free to [file an issue](https://github.com/findify/findify-js/issues/new) or [contact us directly](mailto:yourfriends@findify.io).

If you're using version from CDN, then just update the bundle version from `1.1.x` to `2.0.14`.

For example, if the current version that you are using is `1.4.43` then you'll need to change the URL in the corresponding `<script>` tag in your HTML pages (you can search by `analytics-js`) from:

```
https://findify-assets-2bveeb6u8ag.netdna-ssl.com/analytics-js/prod/findify-analytics.1.1.43.min.js
```

to:

```
https://findify-assets-2bveeb6u8ag.netdna-ssl.com/analytics-js/prod/findify-analytics.2.0.14.min.js
```

If you're using [npm](https://docs.npmjs.com/getting-started/what-is-npm) or
[yarn](https://yarnpkg.com/lang/en/), then just install the latest version of
[https://www.npmjs.com/package/findify-analytics](https://www.npmjs.com/package/findify-analytics)
package from [npm](https://www.npmjs.com/).

##### Migration guide

1) :heavy_check_mark: Update the analytics initialization code:

from:

```javascript
var FindifyAnalytics = require('findify-analytics');
var client = FindifyAnalytics.init({ key: 'your_api_key', events: {}, platform: 'your_platform' });
```

to:

```javascript
var findifyAnalytics = require('findify-analytics');
var client = findifyAnalytics({ key: 'your_api_key' });
client.initialize();
```

2) :heavy_check_mark: Find all the `.getUser()` calls and replace them with `.user`

Thats it! :wink:

## :boom: Upgrading from v2.0.x to v3.0.x

There are no breaking changes in API,
but that package lives under [@findify scope on npm](https://www.npmjs.com/search?q=%40findify).

If you're using [npm](https://docs.npmjs.com/getting-started/what-is-npm) or
[yarn](https://yarnpkg.com/lang/en/), then just install the latest version of
[@findify/analytics](https://www.npmjs.com/package/@findify/analytics) package from
[npm](https://www.npmjs.com/) instead of the [old one](https://www.npmjs.com/package/findify-analytics).

Otherwhise, if you're using it from CDN (as UMD) then you'll need to change the URL in the corresponding `<script>` tag in your HTML pages (you can search by `analytics-js`) from:

```
https://findify-assets-2bveeb6u8ag.netdna-ssl.com/analytics-js/prod/findify-analytics.x.x.x.min.js
```

to:

```
https://findify-assets-2bveeb6u8ag.netdna-ssl.com/analytics-js/prod/3.0.2/findify-analytics.min.js
```

where `x.x.x` is your current version.

## Getting started

1) First, you need to initialize the library.

Usually, you want to do this on "document ready" event to collect all the data from HTML tags.

```javascript
  var findifyAnalytics = require('@findify/analytics');
  var client = findifyAnalytics({ key: 'your_api_key' });
```

Where `key` is your Merchant API key that can be found in your Merchant Dashboard.
Now the `client` instance is ready to be used for sending requests to Findify.

2) Start sending events.

```javascript
client.sendEvent('click-suggestion', {
  rid: 'request_id',
  suggestion: 'Black t-shirt'
});
```

Here is the full list of event types:

* `click-suggestion`
* `click-item`
* `redirect`
* `purchase`
* `update-cart`
* `redirect`
* `purchase`
* `update-cart'`
* `add-to-cart`
* `view-page`

For more information take a look at the [usage example](#usage-example) and
[documentation](#documentation).

## Usage example

```javascript
var findifyAnalytics = require('@findify/analytics');

// Firts, initialize the library
var client = findifyAnalytics({
  key: 'your_api_key',
});

// After library iis nitialized, you can start sending event requests to server with `client` instance. 
// Let's perform click-suggestion request:
client.sendEvent('click-suggestion', {
  rid: 'request_id',
  suggestion: 'Black t-shirt'
});

// You can get `user` instance, which can be used further in `findify-sdk` library:
var user = client.user;

// You can listen for events that are sent through our analytics with `listen` function
var unsubscribe = client.listen(function(event, payload) {
  console.log(event); // outputs event name
  console.log(payload); // outputs event payload
});
```

## Versioning

We will try to follow [semver](http://semver.org/) as close as possible.
That means bug fixes will be patch releases (1.0.1 -> 1.0.2), additional
functionality like new endpoints will be minor releases (1.0.1 -> 1.1.0)
and breaking changes to both the library and the API endpoints it hits,
will be major releases (1.0.1 -> 2.0.0).

## Getting help

We use the GitHub issues for tracking bugs and feature requests.

 * Ask a question on [StackOverflow](https://stackoverflow.com/) and tag it with `findify-analytics`
 * If it turns out that you may have found a bug, please [open an issue](https://github.com/findify/findify-js/issues/new)
 * For general questions about Findify, send us a message to [yourfriends@findify.io](mailto:yourfriends@findify.io)

## Opening issues

If you encounter a bug with the Findify analytics package we would like to hear
about it. Search the [existing issues](https://github.com/findify/findify-js/issues)
and try to make sure your problem doesn’t already exist before opening a new
issue. When creating an issue, please include the version of the analytics package, Node.js or browser
environment and OS you’re using. Please include a stack trace and steps to reproducethe error, if applicable.

The GitHub issues are intended for bug reports and feature requests. For help
and questions with using the Findify analytics package please make use of the
resources listed in the [Getting help](https://github.com/findify/findify-js/tree/master/packages/analytics#getting-help)
section.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to
contribute, setup the development environment and run tests.

## Documentation

[API Reference](https://developers.findify.io/page/findify-analytics-reference)
[Introduction](https://developers.findify.io/page/findify-analytics)
## License

MIT
