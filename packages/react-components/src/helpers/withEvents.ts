import React from 'react';
import { emit, listen } from './emmiter';

export default (events?) => BaseComponent => {
  const factory = React.createFactory(BaseComponent);
  return class Events extends React.Component{
    static displayName = 'Events';
    removeListener: any;

    handler = (event, ...args) => {
      if (!events || !events[event]) return;
      events[event](this.props)(...args);
    }
  
    componentDidMount() {
      this.removeListener = listen(this.handler);
      
    }

    componentWillUnmount(){
      this.removeListener();
    }

    render() {
      return factory({ ...this.props, emit });
    }
  }
}
