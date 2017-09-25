import { createChangeEmitter } from 'change-emitter';
import events from './events';
import { isFunction } from 'lodash';

const win: any = window;
win.findifyApiRegistry = win.findifyApiRegistry || [];
const registry: any = win.findifyApiRegistry;

const storeEmitter = createChangeEmitter();

const store: any = (function() {
  let state = {
    css: [],
    scripts: [],
    hooks: {},
  };

  return {
    getState: () => state,
    update: nextState => {
      if (state === nextState) return;
      storeEmitter.emit(nextState);
      return (state = nextState);
    },
  };
})();

const createHook = (widgetName, functionName, state, fn) => ({
  ...state,
  hooks: {
    ...state.hooks,
    [widgetName]: {
      ...(state.hooks[widgetName] || {}),
      [functionName]: fn,
    },
  },
});

const reduceEvents = (state, event, fn) =>
  ({
    [events.autocompleteGotData]: createHook(
      'autocomplete',
      'mapProps',
      state,
      fn,
    ),
    [events.autocompleteRenderedSuggestions]: createHook(
      'autocomplete.suggestions',
      'didMount',
      state,
      fn,
    ),
    [events.gotConfiguration]: createHook('config', 'hook', state, fn),
    [events.searchGotData]: createHook('search.results', 'mapProps', state, fn),
    [events.searchRenderedBanner]: createHook(
      'search.results',
      'didMount',
      state,
      fn,
    ),
    [events.searchRenderedFacet]: createHook(
      'search.facets',
      'didMount',
      state,
      fn,
    ),
    [events.searchRenderedFooter]: createHook(
      'search.results',
      'didMount',
      state,
      fn,
    ),
    [events.searchRenderedHeader]: createHook(
      'search.results',
      'didMount',
      state,
      fn,
    ),
    [events.searchRenderedResults]: createHook(
      'search.results',
      'didMount',
      state,
      fn,
    ),
    [events.searchRenderedProduct]: createHook(
      'search.product',
      'didMount',
      state,
      fn,
    ),
    [events.searchProductGotData]: createHook(
      'search.product',
      'mapProps',
      state,
      fn,
    ),
  }[event] || state);

const api = {
  on: (event, callback) => {
    const state = store.getState();
    store.update(reduceEvents(state, event, callback));
    return api;
  },
  addStyle: url => {
    const state = store.getState();
    store.update({ ...state, css: [...state.css, url] });
    return api;
  },
  addScript: url => {
    const state = store.getState();
    store.update({ ...state, scripts: [...state.scripts, url] });
    return api;
  },
  events,
};

const v3Register = ({ hook, style, script, ...rest }) => {
  const state = store.getState();
  if (hook) {
    const update = Object.keys(rest).reduce(
      (acc, key) => createHook(hook, key, acc, rest[key]),
      state,
    );
    return store.update(update);
  }
  if (style) {
    return store.update({ ...state, css: [...state.css, style] });
  }
  if (script) {
    return store.update({ ...state, scripts: [...state.scripts, script] });
  }
  return;
};

const execApiFunction = item =>
  isFunction(item) ? item(api) : v3Register(item);

registry.forEach(execApiFunction);
registry.push = execApiFunction;

export default ({ config, type }, callback) => {
  const updateConfig = state => {
    const cfg = { ...config };

    if (!!state.css.length) cfg.css = [...config.css, ...state.css];
    if (!!state.scripts.length)
      cfg.scripts = [...(config.scripts || []), ...state.scripts];
    if (state.hooks.config) state.hooks.config.hook(config);
    return callback(cfg, state.hooks);
  };
  updateConfig(store.getState());
  return storeEmitter.listen(updateConfig);
};
