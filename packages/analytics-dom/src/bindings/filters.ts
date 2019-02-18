const NAME_SELECTOR = 'data-findify-filter';
const VALUE_SELECTOR = 'data-findify-filter-value';
const TYPE_SELECTOR = 'data-findify-filter-type';

import { FiltersData } from '@findify/analytics';

export const getFiltersOnPage = (root): FiltersData[] =>
  Array.prototype.slice
    .call(root.querySelectorAll(`[data-findify-filter]`))
    .map(node => {
      const name = node.getAttribute(NAME_SELECTOR);
      const value = node.getAttribute(VALUE_SELECTOR);
      const type = node.getAttribute(TYPE_SELECTOR);
      let values: any = void 0;

      try {
        if (!isNaN(Number(value))) throw new Error();
        values = JSON.parse(value);
      } catch (e) {
        values = [{ value: value.split(/,|>/).map(v => v && v.trim()) }];
      }

      return { name, values, type: type || undefined };
    })
    .filter(i => !!i);
