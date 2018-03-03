import 'core-js/fn/array/includes';
import createBrowserHistory from 'history/createBrowserHistory';
import { parse, stringify } from 'qs';

export const history = createBrowserHistory();

export const isCollection = (collections) => collections && collections.includes(
  history.location.pathname
    .replace(/^\/|\/$/g, '')
    .toLowerCase()
);

export const isSearch = () =>
  history.location.pathname === __root.config.getIn(['location', 'searchUrl']);

export const getQuery = () => {
  const str = history.location.search;
  const prefix = __root.config.getIn(['location', 'prefix']);
  const elements = parse(str, { decoder: decodeURIComponent, ignoreQueryPrefix: true });
  const res = Object.keys(elements).reduce((acc, key) => {
    const _key = prefix ? key.replace(`${prefix}_`, '') : key;
    return {
      ...acc,
      [_key]: ['limit', 'offset'].includes(_key)
        ? Number(elements[key])
        : elements[key]
    }
  }, {})
  return res;
};

export const buildQuery = (_query = {}) => {
  const prefix = __root.config.getIn(['location', 'prefix']);
  const query = Object.keys(_query).reduce((acc, key) =>
    ({ ...acc, [`${prefix}_${key}`]: _query[key] })
  , {});
  return stringify(query, { encoder: encodeURIComponent, addQueryPrefix: true })
}

export const redirectToSearch = (q) => {
  window.location.href = 
    __root.config.getIn(['location', 'searchUrl']) +
    buildQuery({ q });
};

export const setQuery = (query) => history.push({ search: buildQuery(query) });
