[![npm (scoped)](https://img.shields.io/npm/v/@findify/react-connect.svg)](https://www.npmjs.com/package/@findify/react-connect) [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg)](https://github.com/prettier/prettier)

# @findify/react-connect

This is a set of Components and High Order Functions based on Findify Agents which simplifies data manipulations in [React.js](https://reactjs.org/) applications.

## Documentation

The full documentation can be found here:
<https://developers.findify.io/page/findify-react-connect-reference>

For release notes, see the [CHANGELOG](./CHANGELOG.md).

## Quickstart

### In the Browser

To use the SDK in the browser, simply add the following script tag to your
HTML pages:

```html
<script src="https://cdn.jsdelivr.net/npm/@findify/react-connect@0.5.1/lib/index.min.js"></script>
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

## Minimal Setup

@findify/react-connect' interface looks similar to react-redux. There are two parts - Providers which automatically creates Agent instance and push it through context to connectors, and the Connectors - Hight Order Functions and who listen to changes, mutating entities and adding helpers to the wrapped component.

```javascript
import React from "react";
import { render } from "react-dom";
import { SearchProvider, connectItems } from "@findify/react-connect";

const Items = connectItems(({ items }) =>
	items.map(({ item }) =>
  	<div key={item.hashCode()}>{item.get('title'}</div>
  )
)
                                                    
const App = (
  <SearchProvider key='YOUR_API_KEY'>
  	<Items />
  </SearchProvider>
);

render(App, document.getElementById('root'));
```
