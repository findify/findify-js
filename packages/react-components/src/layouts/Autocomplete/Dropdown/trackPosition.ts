import React, { createFactory, Component } from "react";
import { basename } from "path";


export default BaseComponent => {
  const factory: any = createFactory(BaseComponent);
  return class Tracker extends Component<any, any>{
    constructor(props) {
      super(props);
      this.state = { position: props.config.get('position') || 'left' }
    }
  
    registerComponent = (ref) => {
      if (!ref) return;
      const { left, width } = ref.getBoundingClientRect();
      const windowWidth = window.innerWidth;
      this.setState({ position: windowWidth < (left + width) ? 'right' : 'left' })
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
