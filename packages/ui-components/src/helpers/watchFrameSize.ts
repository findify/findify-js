import { Component, createFactory } from 'react';
import PropTypes from 'prop-types';

export default BaseComponent => {
  const factory = createFactory(BaseComponent);

  return class FrameSizeWatcher extends Component<any, any> {
    win: any = void 0;

    constructor(props) {
      super(props);
      this.resize = this.resize.bind(this);
    }

    state = {
      width: 0,
      height: 0,
    };

    static contextTypes = {
      window: PropTypes.any,
    };

    resize() {
      const width = this.win.innerWidth;
      const height = this.win.innerHeight;
      if (width !== this.state.width || height !== this.state.height) {
        this.setState({ width, height });
      }
    }

    componentWillMount() {
      const { window: frameWindow } = this.context;
      this.win = frameWindow || window;
      this.resize();
      this.win.addEventListener('resize', this.resize);
      this.win.addEventListener('load', this.resize);
    }

    componentWillUnmount() {
      this.win.removeEventListener('resize', this.resize);
      this.win.removeEventListener('load', this.resize);
    }

    render() {
      return factory({ ...this.props, frameSize: this.state });
    }
  };
};
