import { Component, createFactory } from 'react';
import withTheme from 'helpers/withTheme';

import styles from "./styles.css";
import view from './view';

const factory: any = createFactory(view);
const [ initial, stuck, sticky ] = ['static', 'stuck', 'sticky'];

const applyStyles = (element, styles?) => {
  element.removeAttribute("style");
  for (const key in styles) {
    element.style[key] = styles[key] + 'px';
  }
};

class Sticky extends Component<{offset?: number, minHeight?: number}>{
  root: any;
  container: any;
  sizer: any;
  state = { state: initial };

  static displayName = 'Sticky';
  
  componentDidMount() {
    document.addEventListener('scroll', this.handleScroll, true)
  }

  componentWillUnmount() {
    document.removeEventListener('scroll', this.handleScroll, true)
  }

  registerRoot = (r) => {
    if (!r || this.root) return;
    this.root = r;
  }

  registerSizer = (r) => {
    if (!r || this.sizer) return;
    this.sizer = r;
  }

  registerContainer = (r) => {
    if (!r || this.container) return;
    this.container = r;
  }

  handleScroll = (e) => {
    if (!this.container || !this.root) return;
    const { offset = 25, minHeight = 500 } = this.props;
    const rootBound = this.root.getBoundingClientRect();
    const containerBound = this.container.getBoundingClientRect();
    const { width } = this.sizer.getBoundingClientRect();
  
    const shouldStick =
      containerBound.height < rootBound.height &&
      (rootBound.top - offset) < 0;

    if (!shouldStick) {
      applyStyles(this.container);
      return this.setState({ state: initial });
    }
    if (rootBound.bottom <= minHeight) {
      applyStyles(this.container, { minHeight, width });
      return this.setState({ state: stuck });
    };

    const height = rootBound.bottom - offset;
    applyStyles(this.container, { width, maxHeight: height, top: offset })
    return this.setState({ state: sticky });
  }

  render() {
    const { children } = this.props;
    
    return factory({
      ...this.state,
      ...this.props,
      registerRoot: this.registerRoot,
      registerSizer: this.registerSizer,
      registerContainer: this.registerContainer
    })
  }
}

export default withTheme(styles)(Sticky);
