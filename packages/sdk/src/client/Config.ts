import { User } from '../common';
import * as Request from '../request';

/**
 * SDK Client configuration options.
 */
export interface Config {
  /** Search API url */
  url?: string;
  /** Request timeout, defaults to `5000`ms */
  timeout?: number;
  /** Retry count, defaults to `3` */
  retryCount?: number;
  /** JSONP callback function name */
  jsonpCallback?: string;
  /** Merchant API key */
  key: string;
  /** Current user identity info */
  user?: User;
  /** Request method, defaults to `jsonp` */
  method?: Request.Method;
  /** Defines if Findify should log requests on server */
  log?: boolean;
  /** MarketContext for MultiMarket */
  context?: Request.MarketContext,
}
