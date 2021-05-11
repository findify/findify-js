import { createChangeEmitter } from '@findify/change-emitter';
import { useEffect } from 'react';

declare module window {
  const findify: any;
}

const emmiter = createChangeEmitter();
let isSubscribed = false;

// Replace global change emmiter with current
const subscribe = () => {
  if (isSubscribed || !window.findify.addListeners) return;
  window.findify.addListeners(emmiter.getListeners());
  emmiter.emit = window.findify.emit;
  emmiter.listen = window.findify.listen;
  isSubscribed = true;
  return;
};

export const emit = (...args) => {
  subscribe();
  return emmiter.emit(...args);
};

export const listen = (...args) => {
  subscribe();
  return emmiter.listen(...args);
};

export const useEvents = (events?) => {
  useEffect(() => {
    const handler = (event, ...args) => {
      if (!events || !events[event]) return;
      events[event](...args);
    };
    const listener = listen(handler);
    return listener;
  }, []);
};
