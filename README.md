[![Build Status](https://travis-ci.org/findify/findify-js.svg?branch=master)](https://travis-ci.org/findify/findify-js)
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lernajs.io/)

# Findify monorepo

## Install and use components ??

[findify-js](https://github.com/findify/findify-js) is a mono-repo,
which means it is built out of multiple packages.
To start using them in your projects you have to install them one by one.

For example, getting the [SDK](https://github.com/findify/findify-js/tree/master/packages/sdk) will require you to install `@findify/sdk`:

```
$ npm install @findify/sdk
```

## A list of all packages ??


| Package                                                                                            | Description                                      |
|----------------------------------------------------------------------------------------------------|--------------------------------------------------|
| [@findify/bundle](https://github.com/findify/findify-js/tree/master/packages/bundle)                     | [All-in-one solution](https://developers.findify.io/docs/manual-injection) |
| [@findify/react-components](https://github.com/findify/findify-js/tree/master/packages/react-components) | [React components for ecommerce apps](https://developers.findify.io/docs/customization-examples) |
| [@findify/react-connect](https://github.com/findify/findify-js/tree/master/packages/react-connect)             | [React hooks and hocs connected with agents](https://findify.readme.io/v3/reference#introduction-1) |
| [@findify/analytics](https://github.com/findify/findify-js/tree/master/packages/analytics)         | [Feedback API integration](https://developers.findify.io/page/findify-analytics) |
| [@findify/analytics-dom](https://github.com/findify/findify-js/tree/master/packages/analytics-dom)         | [DOM bindings for analytics](https://developers.findify.io/page/findify-analytics-dom) |
| [@findify/sdk](https://github.com/findify/findify-js/tree/master/packages/sdk)                     | [Wrapper of the low-level JSON API](https://findify.readme.io/v3/reference#js-sdk-introduction) |
| [@findify/agent](https://github.com/findify/findify-js/tree/master/packages/agent)             | [Search API state handling library](https://developers.findify.io/page/findify-agent) |
| [@findify/cli](https://github.com/findify/findify-js/tree/master/packages/cli)             | [Set of node.js utils](https://github.com/findify/findify-js/tree/master/packages/cli) |


## Development ?? 

> In our setup [lerna](https://lernajs.io/) uses [yarn](https://yarnpkg.com/lang/en/) to control package dependencies and workspaces, it means you need to have yarn installed

```bash
npm install -g yarn # Install Yarn
yarn # Install dependencies
yarn bootstrap # Build packages
cd packages/bundle && yarn start # Run bundle dev server
```

Afterwards you will be able to develop every single package locally, the dependencies will be pulled from `packages/*` folder.

*Note:* Once before `yarn start` in @findify/bundle you need to build dll by `yarn build:dll` in `packages/bundle` folder.

*Note:* `react-components` are always "hot", so you don't need to rebuild it after change.

## License (MIT) ??
