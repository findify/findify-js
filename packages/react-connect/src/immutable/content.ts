import createRecord from './createRecord';
import { preventEvents } from '../utils/preventEvents';

const navigate = (openInNewWindow, url) => {
  if (!window) return;
  if (openInNewWindow) return window.open(url, '_blank');
  return (window.location.href = url);
};

export class Content extends createRecord('Item') {
  analytics: any;
  meta: any;

  constructor(value, meta, analytics) {
    super(value);
    this.meta = meta;
    this.analytics = analytics;
  }

  sendAnalytics = (sync = false) => {
    this.analytics.sendEvent(
      'click-content',
      {
        rid: this.meta.get('rid'),
        id: this.get('id'),
      },
      sync // Save analytics in cookies if locations will be changed
    );
  };

  onClick = (e) => {
    preventEvents(e);
    const openInNewWindow = e && (e.ctrlKey || e.metaKey);
    this.sendAnalytics(!openInNewWindow);
    navigate(openInNewWindow, this.get('url'));
  };

  historyPush = (e) => {
    preventEvents(e);
    const openInNewWindow = e && (e.ctrlKey || e.metaKey);
    this.sendAnalytics();
    if (openInNewWindow) return navigate(openInNewWindow, this.get('url'));
    const url = this.get('url').replace(document.location.origin);
    if (window && (window as any).findify)
      (window as any).findify.utils.history.push(url);
  };
}
