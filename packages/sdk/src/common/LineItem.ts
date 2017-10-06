/**
 * Product line item.
 */
export interface LineItem {
  /** Item ID bought */
  item_id: string;
  /** Sale price of the product */
  unit_price: number;
  /** Quantity bought */
  quantity: number;
}
