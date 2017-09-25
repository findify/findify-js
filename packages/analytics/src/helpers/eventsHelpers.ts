import * as storage from '../modules/storage';
import mapKeys = require('lodash/mapKeys');
import memoize = require('lodash/memoize');
import { decamelize } from 'humps';

const nodeToArray = node => Array.prototype.slice.call(node);

const normalizeKeys = (obj = {}): any =>
  mapKeys(obj, (_, key) =>
    decamelize(key, { separator: '_' }).replace('findify_', ''),
  );

const normalizeClass = memoize(
  name =>
    ({
      product_id: 'item_id',
      price_currency_code: 'currency',
      order_number: 'order_id',
    }[name] || name),
);

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
    {},
  );

export const getEventData = node => {
  const ownProps = normalizeKeys(node.dataset);

  if (ownProps.event === 'update-cart') {
    return {
      ...ownProps,
      line_items: nodeToArray(node.children).map(e => normalizeKeys(e.dataset)),
    };
  }

  const childrenProps = getPropsFromChildren(node.children);
  return { ...ownProps, ...childrenProps };
};

export const getEventsOnPage = root =>
  nodeToArray(root.querySelectorAll('[data-findify-event]'))
    .map(getEventData)
    .reduce((acc, { event, ...rest }) => ({ ...acc, [event]: rest }), {});

export const getDeprecatedEvents = root => {
  const events = {};
  const pageViewNode = root.querySelector('.findify_page_product');
  const purchaseNode = root.querySelector('.findify_purchase_order');

  if (!!pageViewNode) {
    events['page-view'] = {
      item_id: pageViewNode.innerHTML,
    };
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
          0,
        ),
    };
  }

  return events;
};
