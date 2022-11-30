import { createBrowserHistory } from 'history';
import { parse, stringify } from 'qs';
import { isImmutable } from 'immutable';

let history = createBrowserHistory();
let historyChanged = false;

export const setHistory = (h) => {
  historyChanged = true;
  history = h;
  window.__findifyHistoryChanged = true;
  window.__findifyHistory = h;
};

const isHistoryChanged = () => window.__findifyHistoryChanged || historyChanged;

export const getHistory = () => window.__findifyHistory || history;

// Get basepath -> Returns what is between origin and pages related path eg. /country-code/ or other route structuring.
export const getBasepath = () => {
  // For shopify merchants with multi market enabled basepath must include /country-code/. eg. en-US, en-AU ...
  if (__root.config.getIn(['platform']) === 'shopify' && !!__root.config.getIn(['platform_settings', 'multi_market'])) {
    const regex = new RegExp(/^[a-zA-Z]{2}-[a-zA-Z]{2}/, 'gi');
    const countryPath = window.location.pathname.split('/').find(p => regex.test(p));
    return countryPath ? `/${countryPath}` : __root.config.getIn(['location', 'defaultPath'], '');
  }
  return __root.config.getIn(['location', 'defaultPath'], '');
}

export const collectionPath = () => {
  let path = window.location.pathname;
  if (__root.config.getIn(['platform']) === 'shopify' && !!__root.config.getIn(['platform_settings', 'multi_market'])) {
    path = path.replace(/^\/[a-zA-Z]{2}-[a-zA-Z]{2}/, '').toLowerCase();
  }
  return path.replace(/^\/|\/$/g, '').toLowerCase();
}

export const isCollection = (collections, slot?) =>
  collections && collections.includes(slot || collectionPath());

export const buildSearchPagePathName = () => getBasepath() + __root.config.getIn(['location', 'searchUrl']);

export const isSearch = () => window.location.pathname === buildSearchPagePathName();

export const listenHistory = (cb) => getHistory().listen(cb);

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
  const str = getHistory().location.search;
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
  const search = getHistory().location.search;
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
  if (isHistoryChanged()) {
    return getHistory().push({
      pathname: __root.config
        .getIn(['location', 'searchUrl'])
        .replace(document.location.origin, ''),
      search: buildQuery({ q }),
      state: { type: 'FindifyUpdate' },
    });
  }
  window.location.href = buildSearchPagePathName() + buildQuery({ q });
};

export const setQuery = (query) => {
  const search = buildQuery(query);
  const oldSearch = getHistory().location.search;
  if (oldSearch === search) return;
  return getHistory().push({ search, state: { type: 'FindifyUpdate' } });
};

export const redirectToPage = async (redirect, meta) => {
  const redirection = isImmutable(redirect) ? redirect.toJS() : redirect;
  await __root.analytics.sendEvent('redirect', {
    ...redirection,
    rid: meta.get('rid'),
    suggestion: meta.get('q'),
  });

  // SPA - Redirection has to remove from redirect.url hostname eh. finntack.com + defaultPath eg. /no /pl
  if (isHistoryChanged()) {
    const origin = document.location.origin + getBasepath();
    return getHistory().push(
      redirection.url
        .replace(origin, ''),
      { type: 'FindifyUpdate' }
    );
  }
  // Other websites - Redirection replaces the whole location
  document.location.href = getBasepath() + redirection.url;
};

export const updateHash = (hash: string) => {
  if (isHistoryChanged()) {
    return getHistory().replace({ hash })
  }
  document.location.hash = hash;
}