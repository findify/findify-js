import createRecord from './createRecord';
import { preventEvents } from '../utils/preventEvents';

export class Suggestion extends createRecord('Suggestion') {
  analytics: any;
  meta: any;
  config: any;

  constructor(value, meta, analytics, config) {
    super(value);
    this.meta = meta;
    this.analytics = analytics;
    this.config = config;
  }

  sendAnalytics = (sync = false) => {
    this.analytics.sendEvent(
      'click-suggestion',
      {
        rid: this.meta.get('rid'),
        suggestion: this.get('value'),
      },
      sync // Save analytics in cookies if locations will be changed
    );
  };

  onClick = (e) => {
    preventEvents(e);
    this.sendAnalytics(false);
    const findify = (window as any)?.findify;
    findify.emit('autocompleteFocusLost', this.config.get('widgetKey'));
    findify.emit('search', this.config.get('widgetKey'), this.get('value'));
  };
}
