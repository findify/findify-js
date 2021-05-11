import { getEventData } from './events';

declare module Element {
  const prototype: any;
}

function matches(el, selector) {
  const proto = Element.prototype;
  const fn =
    proto.matches ||
    proto.webkitMatchesSelector ||
    proto.mozMatchesSelector ||
    proto.msMatchesSelector;

  return fn.call(el, selector);
}

const listenClicks = (instance, root) => {
  root.addEventListener(
    'click',
    (e) => {
      if (!matches(e.target, '[data-findify-track]')) return;
      const { track, ...props } = getEventData(e.target);
      instance.sendEvent(track, props);
    },
    false
  );
};

const listenProductDwell = (instance, root) => {
  if (!instance?.state?.events['view-page']) return;
  instance.onLeavePage((ranges) => {
    instance.sendEvent('dwell-product', {
      ...instance.state.events['view-page'],
      visible_at: ranges,
    });
  }, 'product');
};

export const startDOMListeners = (instance, root) => {
  listenClicks(instance, root);
  listenProductDwell(instance, root);
};
