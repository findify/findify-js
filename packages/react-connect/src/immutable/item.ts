import createRecord from './createRecord';
import { preventEvents } from '../utils/preventEvents';

const navigate = (openInNewWindow, url) => {
  if (!window) return;
  if (openInNewWindow) return window.open(url, '_blank');
  return window.location.href = url;
}

export class Item extends createRecord('Item'){
  analytics: any;
  meta: any;

  constructor(value, meta, analytics){
    super(value);
    this.meta = meta;
    this.analytics = analytics;
  };

  onClick(e) {
    preventEvents(e);
    const openInNewWindow = e && (e.ctrlKey || e.metaKey);
    this.analytics.sendEvent(
      'click-product',
      { rid: this.meta.get('rid'), id: this.get('id') },
      !openInNewWindow // Save analytics in cookies if locations will be changed
    );
    navigate(openInNewWindow, this.get('product_url'))
  }
}
