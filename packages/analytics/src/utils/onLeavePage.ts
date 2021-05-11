const scriptLaunchTime = Date.now();
const firingCache = {};
const getContext = (type) =>
  ['pagehide', 'beforeunload'].includes(type) ? document : window;

const [hidden, visibilityChange]: string[] = ((doc: any) => {
  if (typeof doc.hidden !== 'undefined') {
    // Opera 12.10 and Firefox 18 and later support
    return ['hidden', 'visibilitychange'];
  } else if (typeof doc.msHidden !== 'undefined') {
    return ['msHidden', 'msvisibilitychange'];
  } else if (typeof doc.webkitHidden !== 'undefined') {
    return ['webkitHidden', 'webkitvisibilitychange'];
  }
  return [''];
})(document);

const addEventListeners = (listeners, callback, withCapture = true) => {
  for (let index = 0; index < listeners.length; index++) {
    getContext(listeners[index]).addEventListener(
      listeners[index],
      callback,
      withCapture
    );
  }
};

export const onLeavePage = (callback, key = '') => {
  let cache: number[][] = [];
  let launches: number[] = [scriptLaunchTime];
  addEventListeners(
    ['pagehide', 'beforeunload', 'unload', visibilityChange],
    (e) => {
      if (e.type === visibilityChange && !document[hidden]) return;
      if (firingCache[key]) return;
      firingCache[key] = true;
      cache = [...cache, [launches.slice(-1).pop() as number, Date.now()]];
      callback(cache);
      setTimeout(() => (firingCache[key] = false), 100);
    }
  );

  document.addEventListener(visibilityChange, () => {
    if (document[hidden]) return;
    firingCache[key] = false;
    return (launches = [...launches, Date.now()]);
  });
};
