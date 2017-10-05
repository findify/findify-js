import {
  compose,
  withState,
  lifecycle,
  withHandlers,
  setDisplayName,
} from 'recompose';
import { identity, defer } from 'lodash';
import windowEvents from '../helpers/windowEventListener';
import findClosest from '../helpers/findClosestElement';
/**
 * Map key codes to key names
 * @param input KeyboardEvent
 */
const getKey = input =>
  ({
    38: 'up',
    40: 'down',
    13: 'enter',
  }[input.which || input.keyCode || input.charCode]);

/**
 * Compose all event listeners to single HOC
 * @param eventsList[array]
 */
const createComponentHandler = eventsList =>
  lifecycle({
    componentWillMount() {
      this.getProps = () => this.props;
      eventsList.forEach(item => item.mount(this.getProps));
    },
    componentWillUnmount() {
      eventsList.forEach(item => item.unmount(this.getProps));
    },
  });

const nodeEventListenerCreator = action => (
  events,
  handler,
  selector = identity
) => getProps => {
  const props = getProps();
  const node = selector(props.node.instance);
  if (!node) return;
  return windowEvents.get(node)[action](events, handler(getProps));
};

const createNodeEventListener = nodeEventListenerCreator('on');
const removeNodeEventListener = nodeEventListenerCreator('off');

const tracker = {
  position(_, eventsList) {
    const events = [
      'resize',
      'scroll',
      'touchstart',
      'touchmove',
      'touchend',
      'pageshow',
      'mousedown',
    ];

    const handler: any = getProps => () => {
      const { node, updateNode } = getProps();
      const changedNode = node.computePosition();
      if (!!changedNode) updateNode(changedNode);
    };

    eventsList.push({
      mount: (...args) => windowEvents.on(events, handler(...args)),
      unmount: (...args) => windowEvents.on(events, handler(...args)),
    });

    return identity;
  },

  onFormSubmit(callback: any = identity, eventsList) {
    const event = ['submit', 'mjs:submit'];
    const selector = findClosest('form');

    const handler = getProps => e => callback(getProps(), e);

    eventsList.push({
      mount: createNodeEventListener(event, handler, selector),
      unmount: removeNodeEventListener(event, handler, selector),
    });

    return identity;
  },

  focus(callback: any = identity, eventsList) {
    const focusEvents = ['focus'];
    const blurEvents = ['blur'];

    const handler = (state, didFired = false) => getProps => () => {
      const props = getProps();
      const changedNode = props.node.computePosition();
      props.updateNode(
        (changedNode || props.node).set('hasFocus', state),
        callback(props, state)
      );
      if (state && !didFired)
        return setTimeout(handler(state, true)(getProps), 400);
    };

    eventsList.push({
      mount: createNodeEventListener(focusEvents, handler(true)),
      unmount: removeNodeEventListener(focusEvents, handler(true)),
    });

    eventsList.push({
      mount: createNodeEventListener(blurEvents, handler(false)),
      unmount: removeNodeEventListener(blurEvents, handler(false)),
    });

    return identity;
  },

  onChange(callback, eventsList) {
    const changeEvents = ['input', 'cut', 'paste'];

    const handler = getProps => e => {
      const props = getProps();
      const value = e.target.value && e.target.value.trim();
      return props.updateNode(
        props.node.set('value', value),
        callback(props, value)
      );
    };

    eventsList.push({
      mount: createNodeEventListener(changeEvents, handler),
      unmount: removeNodeEventListener(changeEvents, handler),
    });

    return identity;
  },

  onKeyPress(callback, eventsList) {
    const events = ['keydown'];
    const handler: any = getProps => e => {
      const props = getProps();
      return props.node.get('hasFocus') && callback(props, getKey(e), e);
    };

    eventsList.push({
      mount: (...args) => windowEvents.on(events, handler(...args)),
      unmount: (...args) => windowEvents.off(events, handler(...args)),
    });

    return identity;
  },
};

const createTracks = (tracks: INodeTracks, eventsList) =>
  Object.keys(tracks).map(track => tracker[track](tracks[track], eventsList));

const watchNode = (tracks: INodeTracks) => {
  const eventsList = [];
  return compose(
    ...createTracks(tracks, eventsList),
    createComponentHandler(eventsList)
  );
};

/**
 * Track node events
 * @param handlers - callback functions, if present node will watch this prop.
 * @prop position - watch node position and sets "position" to NodeState
 * @prop focus - watch for node focus/blur state, sets "hasFocus" prop to NodeState
 * @prop onChange - watch node value, sets "value" prop to NodeState
 * @prop onKeyPress - watch keypress events when node has focus
 * @prop onFormSubmit - will find closest form and handle its submit
 */
export default setDisplayName('watchNode')(watchNode);

type INodeTracks = {
  position?: any;
  focus?: any;
  onChange?: any;
  onKeyPress?: any;
  onFormSubmit?: any;
};
