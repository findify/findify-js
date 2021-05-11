export const documentReady = new Promise((resolve) => {
  if (
    ['complete', 'loaded', 'interactive'].includes(document.readyState) &&
    document.body
  ) {
    resolve();
  } else {
    document.addEventListener('DOMContentLoaded', resolve, false);
  }
});
