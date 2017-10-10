import { User, Filter, Sort, Pagination } from '../common';

/**
 * Common request parameters;
 */
export interface Base {
  /**
   * Current user identity info.
   * Could be provided either at initialization or at request.
   */
  user?: User;
}

/**
 * Common parameters used in
 * "search" and "smart-collection" requests.
 */
export interface List extends Base, Pagination {
  /** Array of selected filters */
  filters?: Filter[];
  /** Array of selected sortings */
  sort?: Sort[];
}
