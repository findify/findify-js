import React, { createFactory, Component, useRef, useState, useEffect } from "react";

const getPosition = (element) => {
  const { left, width } = element.getBoundingClientRect()
  return window.innerWidth < (left + width) ? 'right' : 'left';
}

export const usePosition = (config) => {
  const element = useRef(null);
  const [position, setPosition] = useState(config.get('position') || 'left');
  useEffect(() => {
    if (!element.current) return;
    window.requestAnimationFrame(() => setPosition(getPosition(element.current)))
  }, [element]);
  return [position, !config.get('position') ? element : undefined];
}

export default BaseComponent => {
  const factory: any = createFactory(BaseComponent);
  return class Tracker extends Component<any, any>{
    constructor(props) {
      super(props);
      this.state = { position: props.config.get('position') || 'left' }
    }
  
    registerComponent = (ref) => {
      if (!ref) return;
      this.setState({ position: getPosition(ref) })
    }
  
    render() {
      return factory({
        ...this.props,
        position: this.state.position,
        innerRef: !this.props.config.get('position') ? this.registerComponent : undefined
      })
    }
  }
}
