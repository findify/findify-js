// tslint:disable-next-line:variable-name
export const addBasepath = (url: string) => {
    // Check if there is country-code
    const regex = new RegExp(/[a-zA-Z]{2}-[a-zA-Z]{2}/, 'gi');
    const hasCountryCode = regex.test(window.location.pathname);
    if (hasCountryCode) {
        return `/${window.location.pathname.match(regex)![0]}` + url;
    }

    return url;
}
