import { Component } from 'react';
import { createEagerFactory } from 'recompose';

export default item => {
  let component;
  const promise = import('findify-ui-components' /* webpackChunkName: "components" */);

  return class LoadComponent extends Component<any, any> {
    state = {
      isLoaded: !!component,
    };

    componentDidMount() {
      if (!!component) return;
      promise.then(res => {
        component = createEagerFactory(res[item]);
        this.setState({ isLoaded: true });
      });
    }

    render() {
      const { isLoaded } = this.state;
      return isLoaded && component(this.props);
    }
  };
};
