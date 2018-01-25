import { Type as RequestType } from './Type';
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
export interface Request {
  type: RequestType.SmartCollection;
  params: Params;
}
