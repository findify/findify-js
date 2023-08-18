
export const hideLoader = () => {
    // if (!node) return;
    const loaders = [].slice.call(document.querySelectorAll('.findify-component-spinner'));
    for (let index = 0; index < loaders.length; index++) {
        const element = loaders[index];
        element.style.display = 'none';
        element.style.visibility = 'hidden';
    }
}
