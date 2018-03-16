import { createChangeEmitter } from '@findify/change-emitter';

declare module window {
  const findify: any
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
}

export const emit = (...args) => {
  subscribe();
  emmiter.emit(...args)
}

export const listen = (...args) => {
  subscribe();
  emmiter.listen(...args);
}
