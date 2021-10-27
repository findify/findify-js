import 'core-js/fn/array/includes';
import createBrowserHistory from 'history/createBrowserHistory';
import { parse, stringify } from 'qs';

const isIE9 = !('pushState' in window.location);

const history = createBrowserHistory();

const pushHistory = (props) => {
  const isAllPropsSame = Object
    .keys(props)
    .reduce((acc, key) => acc && props[key] === history.location[key], true);

   /* Special for IE9: prevent page reload if query is the same */
  if (isIE9 && isAllPropsSame) return;

   return history.push(props);
};

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

const defaultKeys = ['q', 'limit', 'sort', 'offset', 'filters', 'rules'];

const getReservedKeys = () => {
  const keys = __root.config.getIn(['location', 'keys']);
  return keys ? keys.toJS() : defaultKeys;
};

const getRestOfQuery = (query, prefix) => {
  const keys = getReservedKeys();
  return query
    .slice(query.indexOf('?') + 1)
    .split('&')
    .filter((item) => {
      const key = item.split('=')[0];
      const prefixedKey = prefix ? key.replace(`${prefix}_`, '') : key;
      return !keys.find((k) => prefixedKey.startsWith(k));
    })
    .join('&');
};

export const getQuery = (): Record<string, unknown> => {
  const str = history.location.search;
  const keys = getReservedKeys();
  const prefix = __root.config.getIn(['location', 'prefix']);

  const elements = parse(str, {
    decoder: (value) => decodeURIComponent(value.replace(/\+/g, ' ')),
    ignoreQueryPrefix: true,
  });

  return Object.keys(elements).reduce((acc, key) => {
    const _key = prefix ? key.replace(`${prefix}_`, '') : key;
    if (!keys.includes(_key)) return acc;
    return {
      ...acc,
      [_key]: ['limit', 'offset'].includes(_key)
        ? Number(elements[key])
        : elements[key],
    };
  }, {});
};

export const buildQuery = (_query = {}, ignoreRest = false) => {
  const prefix = __root.config.getIn(['location', 'prefix']);
  const search = history.location.search;
  const rest = !ignoreRest && getRestOfQuery(search, prefix);

  const query = Object.keys(_query).reduce(
    (acc, key) => ({
      ...acc,
      [`${prefix ? prefix + '_' : ''}${key}`]: _query[key],
    }),
    {}
  );

  const string = stringify(query, {
    encoder: encodeURIComponent,
    addQueryPrefix: true,
    sort: (a, b) => a.localeCompare(b),
  });

  return string + (rest ? (string ? '&' : '?') + rest : '');
};


export const redirectToSearch = (q) => {
  window.location.href =
    __root.config.getIn(['location', 'searchUrl']) +
    buildQuery({ q });
};

export const setQuery = (query) => {
  const search = buildQuery(query);

  return pushHistory({ search });
};

export const setPathname = (pathname) => pushHistory({ pathname });

export const getLocation = () => history.location;
