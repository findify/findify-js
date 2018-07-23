import { Agent } from './core/Agent';
import * as Types from './types';

/**
 * Agent that works with Search Findify API endpoint
 */
export class Search extends Agent {
  type = Types.RequestType.Search;
}

/**
 * Agent that works with Autocomplete Findify API endpoint
 */
export class Autocomplete extends Agent {
  type = Types.RequestType.Autocomplete;
}

/**
 * Agent that works with Recommendation Findify API endpoint
 */
export class Recommendation extends Agent {
  type = Types.RequestType.Recommendations;
}

/**
 * Agent that works with Content Findify API endpoint
 */
export class Content extends Agent {
  type = Types.RequestType.Content;
}

/**
 * Agent that works with Smart Collections Findify API endpoint
 */
export class SmartCollection extends Agent {
  type = Types.RequestType.SmartCollection;
}
