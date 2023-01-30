// If integration do not rely on the bundle eg. window.findify is undefined then.
const fallbackComputeBasepath = (url) => {
    // Check if there is country-code
    const regex = new RegExp(/^\/[a-zA-Z]{2}-[a-zA-Z]{2}\//, 'gi'); // Match -> /en-ca/
    const countryCode = window.location.pathname.split('/').find(p => regex.test(`/${p}/`));
    if (countryCode) {
        return `/${countryCode}` + url;
    } else {
        return url;
    }
}

// tslint:disable-next-line:variable-name
export const addBasepath = (url: string) => {
    const basepath = (window as any)?.findify?.utils.getBasepath();
    if (basepath) {
        return basepath + url;
    } else {
        return fallbackComputeBasepath(url);
    }
}
