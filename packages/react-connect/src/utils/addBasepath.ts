// tslint:disable-next-line:variable-name
export const addBasepath = (url: string) => {
    // Check if there is country-code
    const regex = new RegExp(/^[a-zA-Z]{2}-[a-zA-Z]{2}/, 'gi');
    const countryPath = window.location.pathname.split('/').find(p => regex.test(p));
    if (countryPath) {
        return `/${countryPath}` + url;
    } else {
        return url;
    }
}
