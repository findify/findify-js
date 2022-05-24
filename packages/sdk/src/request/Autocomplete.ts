import { GenericRequest } from './GenericRequest';
import { Base } from './params';

/**
 * Autocomplete request.
 */
export type Request = GenericRequest<'autocomplete', Params>

/**
 * Autocomplete request parameters.
 */
export interface Params extends Base {
  /** Autocomplete query */
  q?: string;
  /**
   * @deprecated
   * Limit of search suggestions
   * */
  suggestion_limit?: number;
  /**
   * @deprecated
   * Limit of product matches
   * */
  item_limit?: number;

  /**
   * Limit of items returned in response
   * Content will not be returned if limit is not set
   */
  limits: {
    /** Content provider name */
    [key: string]: number;
    /** search suggestions */
    suggestions: number;
    /** product matches */
    items: number;
  };
}
