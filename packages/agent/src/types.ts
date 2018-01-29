import { Client } from '@findify/sdk/lib/client';
import { Config } from '@findify/sdk/lib/client/Config';

export {
  Request,
  Body as RequestBody,
  Type as RequestType
} from '@findify/sdk/lib/request';

export {
  Body as ResponseBody,
  Meta as ResponseMeta,
} from '@findify/sdk/lib/response';

export type SDKClient = Client;

export enum Field {
  Filters = 'filters',
  Query = 'q',
  Sort = 'sort',
  Offset = 'offset',
  Limit = 'limit',
}

export enum Facets {
  text = 'text',
  category = 'category',
  range = 'range',
}

export type State = {
  fields?: any[],
  q?: string,
  sort?: any[],
  offset?: number,
  limit?: number
}

export type ActionHandler = (state: any, meta?:any) => any

export type Handler = {
  key: string,
  handler: ActionHandler
  path: string[]
}

export type AgentConfig = {
  debounce?: number | boolean,
  immutable?: boolean,
  onError?: () => Error
}

export type Config = Config & AgentConfig
