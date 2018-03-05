// tslint:disable-next-line:import-name
import { createElement } from 'react';
import { connectItems } from "@findify/react-connect";

// tslint:disable-next-line:variable-name
export const ConnectedItems = connectItems(({ items }) =>
  items.map(item =>
    createElement('div', { key: item.hashCode() },
      createElement('img', { alt: "example", src: item.get("image_url") })
    )
  ).toArray()
);

// tslint:disable-next-line:variable-name
export const Items = createElement(
  'div',
  { children: createElement(ConnectedItems) }
);

// tslint:disable-next-line:variable-name
export const AutocompleteItems = createElement(
  'div',
  {
    children: createElement(ConnectedItems),
    style: { position: 'absolute' }
  }
);
