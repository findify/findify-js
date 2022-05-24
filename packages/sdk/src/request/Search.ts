import { GenericRequest } from './GenericRequest';
import { List } from './params';

/**
 * Search request.
 */
export type Request = GenericRequest<'search', Params>

/**
 * Search request parameters.
 */
export interface Params extends List {
  /** Search query */
  q: string;
}
