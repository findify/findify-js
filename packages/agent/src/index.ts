import { Agent } from './core/Agent';
import * as Types from './types';

export class Search extends Agent {
  type = Types.RequestType.Search;
}

export class Autocomplete extends Agent {
  type = Types.RequestType.Autocomplete;
}

export class Recommendation extends Agent {
  type = Types.RequestType.Recommendation;
}

export class SmartCollection extends Agent {
  type = Types.RequestType.SmartCollection;
}
