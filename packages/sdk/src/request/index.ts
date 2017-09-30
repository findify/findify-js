import * as Autocomplete from './Autocomplete';
import * as Search from './Search';
import * as SmartCollection from './SmartCollection';
import * as Recommendations from './Recommendations';
import * as Feedback from './Feedback';
import * as Params from './params';

/**
 * Request method.
 */
export enum Method {
  POST = 'post',
  JSONP = 'jsonp',
}

/**
 * Represents a request.
 */
export type Request =
  | Autocomplete.Request
  | Search.Request
  | SmartCollection.Request
  | Recommendations.Request
  | Feedback.Request;

/**
 * Represents a request body.
 */
export type Body =
  | Autocomplete.Params
  | Search.Params
  | SmartCollection.Params
  | Recommendations.Params
  | Feedback.Params;

export { Type } from './Type';
export {
  Params,
  Autocomplete,
  Search,
  SmartCollection,
  Recommendations,
  Feedback,
};
