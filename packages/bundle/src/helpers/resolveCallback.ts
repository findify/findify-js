declare module window {
  const findifyCallback: Promise<any> | undefined | any
}

export default (root, name) => new Promise(resolve => requestAnimationFrame(() => {
  const callbacks = window[name] = window[name] || [];
  window[name].push = (cb) => cb(root);
  if (!callbacks) return resolve();
  const promises = [];
  for (let index = 0; index < callbacks.length; index++) {
    const callback = callbacks[index];
    if (callback instanceof Promise) {
      promises.push(callback(root));
    } else {
      callback(root);
    }
  }
  return Promise.all(promises).then(resolve);
}));
