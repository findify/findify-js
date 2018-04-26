export const addEventListeners = (listeners, callback, context = document) => {
  for (let index = 0; index < listeners.length; index++) {
    context.addEventListener(listeners[index], callback, true);
  }
  return () => {
    for (let index = 0; index < listeners.length; index++) {
      context.removeEventListener(listeners[index], callback);
    }
  }
}
