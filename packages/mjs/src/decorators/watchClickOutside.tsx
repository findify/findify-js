import * as React from 'react';
import { Component } from 'react';
import { setDisplayName } from 'recompose';

const EVENTS = ['mousedown', 'touchstart'];
const isNodeFound = (current, componentNode) => current === componentNode;

const createClickHandler = callback => (componentNode, getProps) => e => {
  let current = e.target;
  const props = getProps();
  if (!props.visible) return;

  while (current.parentNode) {
    if (isNodeFound(current, componentNode)) return;
    current = current.parentNode;
  }

  if (current !== document) return;
  callback(props, e);
};

const onClickOutside = handler => BaseComponent => {
  const handlerCreator = createClickHandler(handler);
  const factory = React.createFactory(BaseComponent);
  return class HandleComponent extends React.Component<any, void> {
    fn: any = void 0;
    instance: any = void 0;

    componentDidMount() {
      const getProps = () => this.props;
      this.fn = handlerCreator(this.instance, getProps);
      if (typeof document !== 'undefined') {
        EVENTS.forEach(eventName =>
          document.addEventListener(eventName, this.fn)
        );
      }
    }

    componentWillUnmount() {
      if (typeof document !== 'undefined') {
        EVENTS.forEach(eventName =>
          document.removeEventListener(eventName, this.fn)
        );
        this.fn = void 0;
      }
    }

    render() {
      return <div ref={r => (this.instance = r)}>{factory(this.props)}</div>;
    }
  };
};

/**
 * Tracks clicks outside component
 * @param handler function which will be called on click outside component
 */
export default setDisplayName('onClickOutside')(onClickOutside);
