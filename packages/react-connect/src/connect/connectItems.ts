import createConnect from './createConnect';

const navigate = (openInNewWindow, url) => {
  if (!window) return;
  if (openInNewWindow) return window.open(url, '_blank');
  return window.location.href = url;
}

export default createConnect({
  feature: 'autocomplete',
  field: 'items',
  handlers: {
    getItemProps: ({ change, analytics, meta }) =>
      (item) => ({
        key: item.get('key'),
        onClick: (e) => {
          if (e) e.preventDefault();
          const openInNewWindow = e && (e.ctrlKey || e.metaKey);
          analytics.sendEvent(
            'click-product',
            { rid: meta.get('rid'), id: item.get('id') },
            !openInNewWindow // Save analytics in cookies if locations will be changed
          );
          navigate(openInNewWindow, item.get('product_url'))
        }
      })
  }
})
