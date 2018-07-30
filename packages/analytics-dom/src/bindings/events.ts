import { decamelize } from 'humps';
import { EventName } from '@findify/analytics/lib/types';

const nodeToArray = node => Array.prototype.slice.call(node);

/**
 * Transform findifyFooBar to foo_bar
 * @param obj 
 */
const normalizeKeys = (obj = {}): any =>
  Object.keys(obj).reduce((acc, key) => ({
    ...acc,
    [decamelize(key, { separator: '_' }).replace('findify_', '')]: obj[key]
  }), {});

/**
 * Map old class names to new event props
 * @param name className
 */
const normalizeClass = name =>
  ({
    product_id: 'item_id',
    price_currency_code: 'currency',
    order_number: 'order_id',
  }[name] || name);

const getPropsFromChildren = nodeList =>
  nodeToArray(nodeList).reduce(
    (acc, element) => ({
      ...acc,
      ...normalizeKeys(element.dataset),
      ...(!!element.className && {
        [normalizeClass(element.className)]: (!element.children.length &&
          element.innerText) || [
          ...(acc[normalizeClass(element.className)] || []),
          getPropsFromChildren(element.children),
        ],
      }),
    }),
    {}
  );

/**
 * Recursively get data-* attributes of node and its children
 * to create key-value object of event props
 * @param node DOMNode
 */
export const getEventData = node => {
  const ownProps = normalizeKeys(node.dataset);

  if ([EventName.purchase, EventName.updateCart].includes(ownProps.event)) {
    return {
      ...ownProps,
      line_items: nodeToArray(node.children).map(e => normalizeKeys(e.dataset)),
    };
  }

  const childrenProps = getPropsFromChildren(node.children);
  return { ...ownProps, ...childrenProps };
};

/**
 * Get all nodes with data-findify-event
 * and recursively create object of [eventName]: {eventProps}
 * @param root window
 */
export const getEventsOnPage = root =>
  nodeToArray(root.querySelectorAll('[data-findify-event]'))
    .map(getEventData)
    .reduce((acc, { event, ...rest }) => ({ ...acc, [event]: rest }), {});

/**
 * An old Analytics API code, but it still works... [maybe] 🤨
 * @param root DOMNode
 */
export const getDeprecatedEvents = root => {
  const events = {};
  const pageViewNode = root.querySelector('.findify_page_product');
  const purchaseNode = root.querySelector('.findify_purchase_order');

  if (!!pageViewNode) {
    const pageViewContent = { item_id: pageViewNode.innerHTML };
    events['page-view'] = pageViewContent;
    events['view-page'] = pageViewContent;
  }

  if (!!purchaseNode) {
    const { line_item, ...data } = getPropsFromChildren(purchaseNode.children);
    events['purchase'] = {
      ...data,
      line_items: line_item,
      revenue:
        line_item &&
        line_item.length &&
        line_item.reduce(
          (amount, { unit_price }) => amount + parseFloat(unit_price),
          0
        ),
    };
  }

  return events;
};
