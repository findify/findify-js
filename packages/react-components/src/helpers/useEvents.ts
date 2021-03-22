import { useEffect, createElement } from 'react';
import { listen } from 'helpers/emmiter';

export default (events?) => {
  useEffect(() => {
    const handler = (event, ...args) => {
      if (!events || !events[event]) return;
      events[event](...args);
    };
    const listener = listen(handler);
    return listener;
  }, []);
};
