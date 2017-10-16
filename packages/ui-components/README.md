# Findify UI components [![npm (scoped)](https://img.shields.io/npm/v/@findify/ui-components.svg)](https://www.npmjs.com/package/@findify/ui-components)

# Getting started

## Installation
```
npm install @findify/ui-components --save
```
or
```
yarn add @findify/ui-components
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

## Versioning

We will try to follow [semver](http://semver.org/) as close as possible.
That means bug fixes will be patch releases (1.0.1 -> 1.0.2), additional
functionality like new endpoints will be minor releases (1.0.1 -> 1.1.0)
and breaking changes to both the library and the API endpoints it hits,
will be major releases (1.0.1 -> 2.0.0).

## Getting help

We use the GitHub issues for tracking bugs and feature requests.

 * Ask a question on [StackOverflow](https://stackoverflow.com/) and tag it with `findify-ui-components`
 * If it turns out that you may have found a bug, please [open an issue](https://github.com/findify/findify-js/issues/new)

## Opening Issues

If you encounter a bug with the Findify UI components we would like to hear
about it. Search the [existing issues](https://github.com/findify/findify-js/issues)
and try to make sure your problem doesn’t already exist before opening a new
issue. It’s helpful if you include the version of the UI components, Node.js or browser
environment and OS you’re using. Please include a stack trace and reduced repro
case when appropriate, too.

The GitHub issues are intended for bug reports and feature requests. For help
and questions with using the Findify UI components please make use of the
resources listed in the [Getting help](https://github.com/findify/findify-js/tree/master/packages/ui-components#getting-help)
section.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to
contribute, setup the development environment and run tests.
