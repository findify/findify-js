import { Autocomplete } from './Autocomplete';
import { Search } from './Search';
import { SmartCollection } from './SmartCollection';
import { Recommendations } from './Recommendations';
import { Feedback } from './Feedback';

/**
 * Response metadata.
 */
export interface Meta {
  /** Request ID */
  rid: string;
}

/** Response body */
export type Body = CommonBody & SpecificBody;

/**
 * Common response body.
 */
export interface CommonBody {
  meta: Meta;
}

/**
 * Response body depending on the response type.
 */
export type SpecificBody =
  | Autocomplete
  | Search
  | SmartCollection
  | Recommendations
  | Feedback;

export { Autocomplete, Search, SmartCollection, Recommendations, Feedback };
