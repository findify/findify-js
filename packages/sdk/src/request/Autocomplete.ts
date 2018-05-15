import { Type as RequestType } from './Type';
import { Base } from './params';

/**
 * Autocomplete request.
 */
export interface Request {
  type: RequestType.Autocomplete;
  /** Request parameters */
  params: Params;
}

/**
 * Autocomplete request parameters.
 */
export interface Params extends Base {
  /** Autocomplete query */
  q?: string;
  /** Limit of search suggestions */
  suggestion_limit?: number;
  /** Limit of product matches */
  item_limit?: number;
}
