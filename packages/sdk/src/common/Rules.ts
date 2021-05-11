/**
 * Filter that can be use to
 * narrow down the search query.
 */
export interface Rule {
  /** Name of filter */
  name: string;
  /** Type of filter */
  type: string;
  /** Array of selected filter values */
  values?: RuleValue[];
}

/*
 * Represents selected filter value.
 */
export interface RuleValue {
  /** Selected filter value */
  value?: string;
  /** Selected range filter "from" value */
  from?: string;
  /** Selected range filter "to" value */
  to?: string;
}
