export const hideFallback = (node) => {
  if (!node) return;
  const fallback = [].slice.call(node.querySelectorAll('.findify-fallback'));
  for (let index = 0; index < fallback.length; index++) {
    const element = fallback[index];
    element.style.display = 'none';
    element.style.visibility = 'hidden';
  }
}

export const showFallback = (node) => {
  if (!node) return;
  const fallback = [].slice.call(node.querySelectorAll('.findify-fallback'));
  for (let index = 0; index < fallback.length; index++) {
    const element = fallback[index];
    element.style.display = '';
    element.style.visibility = '';
  }
}

export const hideLoader = (node) => {
  if (!node) return;
  const loaders = [].slice.call(node.querySelectorAll('.findify-component-spinner'));
  for (let index = 0; index < loaders.length; index++) {
    const element = loaders[index];
    element.style.display = 'none';
    element.style.visibility = 'hidden';
  }
}
