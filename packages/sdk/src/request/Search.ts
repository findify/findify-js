import { Type as RequestType } from './Type';
import { List } from './params';

/**
 * Search request.
 */
export interface Request {
  type: RequestType.Search;
  /** Request parameters */
  params: Params;
}

/**
 * Search request parameters.
 */
export interface Params extends List {
  /** Search query */
  q: string;
}
