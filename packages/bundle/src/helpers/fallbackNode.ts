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