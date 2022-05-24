import { GenericRequest } from './GenericRequest';
import { List } from './params';

/**
 * Smart collection request parameters.
 */
export interface Params extends List {
  /** Collection handle */
  slot: string;
}


/**
 * Smart collection request.
 */
export type Request = GenericRequest<'smart-collection', Params>
