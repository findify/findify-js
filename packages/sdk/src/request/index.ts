import { User } from '../common';
import * as Autocomplete from './Autocomplete';
import * as Content from './Content';
import * as Feedback from './Feedback';
import * as Recommendations from './Recommendations';
import * as Search from './Search';
import * as SmartCollection from './SmartCollection';
import * as Params from './params';

/**
 * Request method.
 */
export enum Method {
  POST = 'post',
  JSONP = 'jsonp',
}

/** Request body */
export type Body = CommonParams & SpecificParams;

/**
 * Represents a request.
 */
export type Request =
  | Autocomplete.Request
  | Search.Request
  | SmartCollection.Request
  | Recommendations.Request
  | Feedback.Request
  | Content.Request;

/**
 * MarketContext for MultiMarket
 */
export type MarketContext = undefined | {
  language?: string;
  region?: string;
  currency?: string;
}

/**
 * Common request body parameters.
 */
export interface CommonParams {
  /** A timestamp from the client side of the user */
  t_client: number;
  user: User;
  key: string;
  log?: boolean;
  context?: MarketContext
}

/**
 * Request body parameters depending on the request type.
 */
export type SpecificParams =
  | Autocomplete.Params
  | Search.Params
  | SmartCollection.Params
  | Recommendations.Params
  | Content.Params
  | Feedback.Params;

export { Type } from './Type';
export {
  Autocomplete, Content,
  Feedback, Params, Recommendations, Search,
  SmartCollection
};

