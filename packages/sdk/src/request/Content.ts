import { GenericRequest } from './GenericRequest';
import { List } from './params';

/**
 * Content search request.
 */
export type Request = GenericRequest<'content', Params>

/**
 * Search request parameters.
 */
export interface Params extends List {
  /** Search query */
  q: string;
}
