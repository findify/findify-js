export const isCollection = (url) => {
    if (!url) url = window.location.pathname;
    // @ts-ignore
    const collections = window.findify?.config?.toJS().collections;
    return collections?.some(collection => {
        if (!collection) return;
        return url.includes(collection)
    });
}

export const isSearch = (url) => {
    if (!url) url = window.location.pathname;
    // @ts-ignore
    const searchUrl = window.findify?.config?.toJS().location.searchUrl;
    return url.includes(searchUrl);
}