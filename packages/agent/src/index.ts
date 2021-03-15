import { Agent } from './core/Agent';
import { Type as RequestType } from '@findify/sdk/lib/request';
/**
 * Agent that works with Search Findify API endpoint
 */
export class Search extends Agent {
  type = RequestType.Search;
}

/**
 * Agent that works with Autocomplete Findify API endpoint
 */
export class Autocomplete extends Agent {
  type = RequestType.Autocomplete;
}

/**
 * Agent that works with Recommendation Findify API endpoint
 */
export class Recommendation extends Agent {
  type = RequestType.Recommendations;
}

/**
 * Agent that works with Content Findify API endpoint
 */
export class Content extends Agent {
  type = RequestType.Content;
}

/**
 * Agent that works with Smart Collections Findify API endpoint
 */
export class SmartCollection extends Agent {
  type = RequestType.SmartCollection;
}
