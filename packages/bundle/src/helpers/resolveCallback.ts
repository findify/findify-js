declare module window {
  const findifyCallback: Promise<any> | undefined | any
}

export default root => new Promise(resolve => {
  const cb = window.findifyCallback;
  if (!cb) return resolve();
  if (cb instanceof Promise) return cb(root).then(resolve);
  cb(root);
  resolve();
  return;
})
