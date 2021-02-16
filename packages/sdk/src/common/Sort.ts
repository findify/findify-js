enum SortingOrder {
  Asc = 'asc',
  Desc = 'desc',
}

/**
 * Sorting parameters.
 */
export interface Sort {
  /** Field for sorting */
  field: string;
  /** Sorting order */
  order: SortingOrder;
}
