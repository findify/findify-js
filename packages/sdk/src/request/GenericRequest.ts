import { Type } from './Type';

export type GenericRequest<T extends Type, Params> = {
  type: T,
  params: Params
}