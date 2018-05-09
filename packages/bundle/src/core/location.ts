import 'core-js/fn/array/includes';
import createBrowserHistory from 'history/createBrowserHistory';
import { parse, stringify } from 'qs';

const isIE9 = !('pushState' in window.location);

export const history = createBrowserHistory();

export const collectionPath = () => history
  .location
  .pathname
  .replace(/^\/|\/$/g, '')
  .toLowerCase();

export const isCollection = (collections) => collections && collections.includes(
  collectionPath()
);

export const isSearch = () =>
  history.location.pathname === __root.config.getIn(['location', 'searchUrl']);

export const listenHistory = history.listen;

export const getQuery = () => {
  const str = history.location.search;
  const prefix = __root.config.getIn(['location', 'prefix']);
  const elements = parse(str,
    { decoder: (value) => decodeURIComponent(value.replace(/\+/g, ' ')), ignoreQueryPrefix: true }
  );
  return Object.keys(elements).reduce((acc, key) => {
    const _key = prefix ? key.replace(`${prefix}_`, '') : key;
    return {
      ...acc,
      [_key]: ['limit', 'offset'].includes(_key)
        ? Number(elements[key])
        : elements[key]
    }
  }, {});
};

export const buildQuery = (_query = {}) => {
  const prefix = __root.config.getIn(['location', 'prefix']);
  const query = Object.keys(_query).reduce((acc, key) =>
    ({ ...acc, [`${prefix}_${key}`]: _query[key] })
  , {});
  return stringify(query, {
    encoder: encodeURIComponent,
    addQueryPrefix: true,
    sort: (a, b) => a.localeCompare(b)
  })
}

export const redirectToSearch = (q) => {
  window.location.href =
    __root.config.getIn(['location', 'searchUrl']) +
    buildQuery({ q });
};

export const setQuery = (query) => {
  const search = buildQuery(query);

  /* Special for IE9: prevent page reload if query is the same */
  if (isIE9 && search === history.location.search) return;
  return history.push({ search });
};
