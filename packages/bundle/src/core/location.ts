import 'core-js/features/array/includes';
import { createBrowserHistory } from 'history';
import { parse, stringify } from 'qs';

export const isIE9 = !('pushState' in window.location);

export const history = createBrowserHistory();

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

export const listenHistory = history.listen;

const getPrefix = (): string => {
  const prefix = __root.config.getIn(['location', 'prefix']);
  const formattedPrefix = !!prefix ? `${prefix}_` : '';
  return formattedPrefix;
}

const normalizeQueryValue = (() => {
  const numberKeys = {
    limit: true,
    offset: true
  };

  return (key: string, value: string): string | number =>
    numberKeys[key] ? Number(value) : value;
})();

const parseQueryElement = (): { [key: string]: string } => {
  const str = history.location.search;
  const elements = parse(str, {
    decoder: (value) => decodeURIComponent(value.replace(/\+/g, ' ')),
    ignoreQueryPrefix: true
  });
  return elements;
}

const isFindifyQueryElement = (() => {
  const findifyQueryElements = {
    limit: true,
    offset: true,
    q: true,
    filters: true,
    sort: true,
    rules: true
  }

  return key => !!findifyQueryElements[key];
})();

export const getQuery = () => {
  const elements = parseQueryElement();
  const prefix = getPrefix();
  return Object.keys(elements).reduce((acc, key) => {
    const formattedKey = key.replace(prefix, '');
    const value = normalizeQueryValue(formattedKey, elements[key]);
    return {
      ...acc,
      [formattedKey]: value
    }
  }, {});
};

const getNotFindifyQueryElements = () => {
  const elements = parseQueryElement();
  const prefix = getPrefix();
  return Object.keys(elements).reduce((acc, key) => {
    const formattedKey = key.replace(prefix, '');
    if (!isFindifyQueryElement(formattedKey)) {
      return {
        ...acc,
        [formattedKey]: elements[key]
      };
    }
    return acc;
  }, {});
};

export const buildQuery = (_query = {}) => {
  const prefix = getPrefix();
  const query = Object.keys(_query).reduce((acc, key) => ({
    ...acc,
    [isFindifyQueryElement(key) ? `${prefix}${key}` : key]: _query[key]
  }), {});
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
  const notFindifyQuery = getNotFindifyQueryElements();

  const search = buildQuery({
    ...query,
    ...notFindifyQuery
  });

  /* Special for IE9: prevent page reload if query is the same */
  if (isIE9 && search === history.location.search) return;
  return history.push({ search });
};


export const redirectToPage = async (redirect, meta) => {
  await __root.analytics.sendEvent('redirect', {
    ...redirect.toJS(),
    rid: meta.get('rid'),
    suggestion: meta.get('q')
  });
  document.location.href = redirect.get('url');
}