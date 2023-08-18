export const isCollection = (url) => {
    if (!url) url = window.location.href;
    // @ts-ignore
    const collections = window.findify?.config?.toJS().collections;
    return url.includes(collections);
}

export const isSearch = (url) => {
    if (!url) url = window.location.href;
    // @ts-ignore
    const searchUrl = window.findify?.config?.toJS().location.searchUrl;
    return url.includes(searchUrl);
}