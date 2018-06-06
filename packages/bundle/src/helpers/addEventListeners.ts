export const addEventListeners = (listeners, callback, context = document, withCapture = true) => {
  for (let index = 0; index < listeners.length; index++) {
    context.addEventListener(listeners[index], callback, withCapture);
  }
  return () => {
    for (let index = 0; index < listeners.length; index++) {
      context.removeEventListener(listeners[index], callback, withCapture);
    }
  }
}
