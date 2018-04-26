import { Type as RequestType } from './Type';
import { List } from './params';

/**
 * Content search request.
 */
export interface Request {
  type: RequestType.Content;
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
