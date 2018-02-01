
import { getEventData } from './events';

declare module Element {
  const prototype: any
}

function matches(el, selector) {
	const proto = Element.prototype;
  const fn = proto.matches
    || proto.webkitMatchesSelector
    || proto.mozMatchesSelector
    || proto.msMatchesSelector;

	return fn.call(el, selector);
}

export const startDOMListeners = (sendEvent, root) => 
  root.addEventListener('click', (e) => {
    if (!matches(e.target, '[data-findify-track]')) return;
    const { track, ...props } = getEventData(e.target);
    sendEvent(track, props);
  }, false);
