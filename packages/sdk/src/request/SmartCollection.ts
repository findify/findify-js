import { Type as RequestType } from './type';
import { List } from './params';

/**
 * Smart collection request.
 */
export interface Request {
  type: RequestType.SmartCollection;
  params: Params;
}

/**
 * Smart collection request parameters.
 */
export interface Params extends List {
  /** Collection handle */
  slot: string;
}
