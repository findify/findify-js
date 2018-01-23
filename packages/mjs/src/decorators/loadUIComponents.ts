import { Component, createFactory } from 'react';

export default item => {
  let component;
  const promise = import('@findify/ui-components' /* webpackChunkName: "components" */);

  return class LoadComponent extends Component<any, any> {
    state = {
      isLoaded: !!component,
    };

    componentDidMount() {
      if (!!component) return;
      promise.then(res => {
        component = createFactory(res[item]);
        this.setState({ isLoaded: true });
      });
    }

    render() {
      const { isLoaded } = this.state;
      return isLoaded && component(this.props);
    }
  };
};
