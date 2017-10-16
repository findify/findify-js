# Findify Merchant JS [![npm (scoped)](https://img.shields.io/npm/v/@findify/mjs.svg)](https://www.npmjs.com/package/@findify/mjs)

## Getting started

**Accessing API:**

After MJS loads it start listening to objects in `window.findifyApiRegistry` and processing them immediately.
By using this functionality you can modify response, change styles and inject your code to every part of MJS lifecycle.


**Customize styles in iFrame:**

You can modify CSS styles of components by simply adding object with single key `style` and styles or link to CSS file in thats value.
e.q:

```javascript
{
  style: 'body{ background: black; }'
}
```

**Include JavaScript files in iFrame:**

Same as with adding styles, you can add to registry object with key `script` and value with link to script you would like to include.
e.q:

```javascript
{
  script: 'http://path_to_your_javascript_file'
}
```

**Modify data and view on fly with Hooks.**

MJS uses powerful hook system, which allow you to modify data views inside components lifecycle.
Hook object contains three fields:
1. `hook` - name of hook, is [context].[component] composition, which specifies component where hook will be injected.
2. `mapProps` - function which allow you to change data which will be passed to component.
3. `didMount` - function triggers on component view was rendered in window.
4. `didUpdate` - similar to previews one, but triggers every time when view was changed.

e.q:
```javascript
{
  hook: 'search.products',

  didMount: function(data) {
    $(data.node).appendChild('<div>CUSTOM HTML</div>');
  },

  mapProps: function(props) {
    var width = props.size.width;
    if (width > 1000) {
      return { columns: 4 };
    } else {
      return { columns: 3 };
    }
  }
}
```
**Available hooks:**

*search*:
- `search.results` - Search results container
- `search.facets` - Desktop facets list
- `search.facet` - Single desktop facet
- `search.products` - Products grid
- `search.product` - Single product item
- `search.noResults` - Products list, which renders when no matching products found

*autocomplete*:
- `autocomplete.suggestions` - Suggestions list
- `autocomplete.products` - Products matches grid
- `autocomplete.product` - Single product item

*recommendations*:
- `recommendations.slider` - Recommendations list with type "Carousel"
- `recommendations.products` - Recommendations list with type "Grid"
- `recommendations.product` - Single recommendation

*mobile*:
- `mobile.facets` - Facets list in mobile view
- `mobile.facet` - Single facet in mobile view

**Lifecycle functions:**

`mapProps, ({ config, ...rest })` - Allow you to change props which will be passed to component, it contains `config` and
 other component specific props. ***Important** - don't execute slow code here, it will affect component rendering speed*

`didMount, ({ node: DOMNode, data: componentProps })` - Function which will be executed on component did mount, it will pass node and component props to callback. We recommend to do all DOM manipulations here.

`didUpdate, ({ node: DOMNode, data: componentProps })` - same as `didMount`, but will fire every time when props was updated

## Versioning

We will try to follow [semver](http://semver.org/) as close as possible.
That means bug fixes will be patch releases (1.0.1 -> 1.0.2), additional
functionality like new endpoints will be minor releases (1.0.1 -> 1.1.0)
and breaking changes to both the library and the API endpoints it hits,
will be major releases (1.0.1 -> 2.0.0).

## Getting help

We use the GitHub issues for tracking bugs and feature requests.

 * Ask a question on [StackOverflow](https://stackoverflow.com/) and tag it with `findify-mjs`
 * If it turns out that you may have found a bug, please [open an issue](https://github.com/findify/findify-js/issues/new)

## Opening Issues

If you encounter a bug with the Findify Merchant JS we would like to hear
about it. Search the [existing issues](https://github.com/findify/findify-js/issues)
and try to make sure your problem doesn’t already exist before opening a new
issue. It’s helpful if you include the version of the Merchange JS, Node.js or browser
environment and OS you’re using. Please include a stack trace and reduced repro
case when appropriate, too.

The GitHub issues are intended for bug reports and feature requests. For help
and questions with using the Findify Merchant JS please make use of the
resources listed in the [Getting help](https://github.com/findify/findify-js/tree/master/packages/mjs#getting-help)
section.

## Contributing

Please see [CONTRIBUTING.md](./CONTRIBUTING.md) for information on how to
contribute, setup the development environment and run tests.
