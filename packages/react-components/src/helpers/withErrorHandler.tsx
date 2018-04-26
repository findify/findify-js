import React from 'react';

export default (BaseComponent) => {
  const factory = React.createFactory(BaseComponent);
  return class ErrorBoundary extends React.Component {
    static displayName = 'ErrorBoundary';

    state = { error: false };

    componentDidCatch(error, info) {
      this.setState({ error: true });
      console.error(error, info);
    }

    render() {
      return this.state.error ? null : factory(this.props);
    }
  }
}
