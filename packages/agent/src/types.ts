import { Client } from '@findify/sdk/lib/client/index';
import { Config } from '@findify/sdk/lib/client/Config';

export {
  Request,
  Body as RequestBody,
  Type as RequestType
} from '@findify/sdk/lib/request/index';

export {
  Body as ResponseBody,
  Meta as ResponseMeta,
} from '@findify/sdk/lib/response/index';

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
  path: (any) => any
}

export type AgentConfig = {
  debounce?: number | boolean
}

export type Config = Config & AgentConfig
