import React, { useEffect, createElement } from 'react';
import { emit, listen } from 'helpers/emmiter';

export default (events?) => BaseComponent => props => {
  const handler = (event, ...args) => {
    if (!events || !events[event]) return;
    events[event](props)(...args);
  }

  useEffect(() => {
    const listener = listen(handler);
    return listener;
  })

  return createElement(BaseComponent, { ...props, emit })
}
