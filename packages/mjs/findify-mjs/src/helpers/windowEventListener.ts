const listeners = (node: any = window) => ({
  on: (events, cb) => events.forEach(evt => node.addEventListener(evt, cb)),
  off: (events, cb) => events.forEach(evt => node.removeEventListener(evt, cb)),
});

export default {
  ...listeners(),
  get: listeners,
};
