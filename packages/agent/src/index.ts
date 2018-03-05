import { Agent } from './core/Agent';
import * as Types from './types';

export class Search extends Agent {
  type = Types.RequestType.Search;
}

export class Autocomplete extends Agent {
  type = Types.RequestType.Autocomplete;
  emptyResponse = { items: [], meta: {}, suggestions: [] };

  /** Return empty response if "q" is not set */
  request(cache: any) {
    if (!cache.get('q')) {
      this.createRequestBody(cache);
      return this.handleResponse(this.emptyResponse);
    }
    return super.request(cache);
  }
}

export class Recommendation extends Agent {
  type = Types.RequestType.Recommendations;
}

export class SmartCollection extends Agent {
  type = Types.RequestType.SmartCollection;
}
