export default (url) => {
  const tag = document.createElement('link');
  tag.href = url;
  tag.rel = 'stylesheet';
  document.getElementsByTagName('head')[0].appendChild(tag);
}
