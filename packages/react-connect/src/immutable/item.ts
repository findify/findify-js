import createRecord from './createRecord';
import { preventEvents } from '../utils/preventEvents';

const navigate = (openInNewWindow, url) => {
  if (!window) return;
  if (openInNewWindow) return window.open(url, '_blank');
  return (window.location.href = url);
};

export class Item extends createRecord('Item') {
  analytics: any;
  meta: any;

  constructor(value, meta, analytics) {
    super(value);
    this.meta = meta;
    this.analytics = analytics;
  }

  sendAnalytics = (sync = false) => {
    this.analytics.sendEvent(
      'click-item',
      {
        rid: this.meta.get('rid'),
        item_id: this.get('id'),
        variant_item_id: this.get('selected_variant_id'),
      },
      sync // Save analytics in cookies if locations will be changed
    );
  };

  onClick = (e) => {
    preventEvents(e);
    const openInNewWindow = e && (e.ctrlKey || e.metaKey);
    this.sendAnalytics(!openInNewWindow);
    if (!openInNewWindow && typeof window !== 'undefined') {
      document.location.hash = this.get('id');
    }
    navigate(openInNewWindow, this.get('product_url'));
  };

  historyPush = (e) => {
    preventEvents(e);
    const openInNewWindow = e && (e.ctrlKey || e.metaKey);
    this.sendAnalytics();
    if (openInNewWindow)
      return navigate(openInNewWindow, this.get('product_url'));
    const url = this.get('product_url').replace(document.location.origin);
    if (window && (window as any).findify)
      (window as any).findify.utils.history.push(url);
  };
}
