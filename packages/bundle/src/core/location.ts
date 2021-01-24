import 'core-js/features/array/includes';
import { createBrowserHistory } from 'history';
import { parse, stringify } from 'qs';

export const isIE9 = !('pushState' in window.location);

let history = createBrowserHistory();
let historyChanged = false;

export const setHistory = (h) => {
  historyChanged = true;
  history = h;
}

export const getHistory = () => history;
  
export const collectionPath = () => window
  .location
  .pathname
  .replace(/^\/|\/$/g, '')
  .toLowerCase();

export const isCollection = (collections, slot?) =>
  collections && collections.includes(
    slot || collectionPath()
  );

export const isSearch = () =>
  window.location.pathname === __root.config.getIn(['location', 'searchUrl']);

export const listenHistory = (cb) => getHistory().listen(cb);

export const getQuery = () => {
  const str = getHistory().location.search;
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
    ({ ...acc, [`${!!prefix ? prefix + '_' : ''}${key}`]: _query[key] })
  , {});
  return stringify(query, {
    encoder: encodeURIComponent,
    addQueryPrefix: true,
    sort: (a, b) => a.localeCompare(b)
  })
}

export const redirectToSearch = (q) => {
  if (historyChanged) {
    return getHistory().push(
      {
        pathname: __root.config.getIn(['location', 'searchUrl']).replace(document.location.origin, ''),
        search: buildQuery({ q }),
        state: { type: 'FindifyUpdate'}
      }
    )
  }
  window.location.href =
    __root.config.getIn(['location', 'searchUrl']) +
    buildQuery({ q });
};

export const setQuery = (query) => {
  const search = buildQuery(query);
  /* Special for IE9: prevent page reload if query is the same */
  if (isIE9 && search === getHistory().location.search) return;
  return getHistory().push({ search, state: { type: 'FindifyUpdate' } });
};


export const redirectToPage = async (redirect, meta) => {
  await __root.analytics.sendEvent('redirect', {
    ...redirect.toJS(),
    rid: meta.get('rid'),
    suggestion: meta.get('q')
  });
  if (historyChanged) {
    return getHistory().push(redirect.get('url').replace(document.location.origin, ''), { type: 'FindifyUpdate'} )
  }
  document.location.href = redirect.get('url');
}
