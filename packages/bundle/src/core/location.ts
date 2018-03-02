import createBrowserHistory from 'history/createBrowserHistory';
import { parse, stringify } from 'qs';

export const history = createBrowserHistory();

export const isCollection = (collections) => collections && collections.includes(
  history.location.pathname
    .replace(/^\/|\/$/g, '')
    .toLowerCase()
);

export const getQuery = () => {
  const str = history.location.search;
  const prefix = __root.config.getIn(['url', 'prefix']);
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

export const setQuery = (query) => 
  history.push({
    search: stringify(query, {
      encoder: encodeURIComponent,
      addQueryPrefix: true 
    })
  })
