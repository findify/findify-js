import { Filter, Sort, SortingOrder, LineItem } from '../common';
import * as Request from '../request';

/**
 * Validate presence of parameter.
 */
export function validatePresence<T>(name: string, value: T | T[]) {
  if (value == null) {
    throw new Error(`"${name}" param is required`);
  }
  if (Array.isArray(value) && value.length === 0) {
    throw new Error(`"${name}" param can not be empty`);
  }
  if (String(value).trim().length < 1) {
    throw new Error(
      `"${name}" param can not be an empty or only-whitespace string`
    );
  }
}

/**
 * Validate list request parameters.
 * @param req Common parameters used in list requests.
 */
export function validateList({ filters, sort }: Request.Params.List) {
  if (Boolean(filters)) validateFilters(filters!);
  if (Boolean(sort)) validateSortings(sort!);
}

export function validateFilters(filters: Filter[]) {
  filters.forEach(filter => {
    validatePresence('filter.name', filter.name);
    validatePresence('filter.type', filter.type);
  });
}

export function validateSortings(sortings: Sort[]) {
  sortings.forEach(sort => {
    validatePresence('sort.field', sort.field);
    validatePresence('sort.order', sort.order);
    if (!Object.values(SortingOrder).includes(sort.order)) {
      throw new Error('"sort.order" param should be either "asc" or "desc"');
    }
  });
}

export function validateLineItems(items: LineItem[]) {
  if (items == null) {
    throw new Error('"line_items" param is required');
  }
  items.forEach(item => {
    validatePresence('line_items[].item_id', item.item_id);
    validatePresence('line_items[].unit_price', item.unit_price);
    validatePresence('line_items[].quantity', item.quantity);
  });
}
