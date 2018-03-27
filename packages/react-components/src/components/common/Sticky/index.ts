import { Component, createFactory } from 'react';
import withTheme from 'helpers/withTheme';

import styles from "./styles.css";
import view from './view';

const factory: any = createFactory(view);
const [ initial, stuck, sticky ] = ['static', 'stuck', 'sticky'];

const applyStyles = (element, styles?) => {
  if (!styles) return element.removeAttribute("style");
  for (const key in styles) {
    element.style[key] = styles[key] + 'px';
  }
};

class Sticky extends Component<{offset?: number, minHeight?: number}>{
  root: any;
  container: any;
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

  registerContainer = (r) => {
    if (!r || this.container) return;
    this.container = r;
  }

  handleScroll = (e) => {
    if (!this.container || !this.root) return;
    const { offset = 50, minHeight = 500 } = this.props;
    const rootBound = this.root.getBoundingClientRect();
    const containerBound = this.container.getBoundingClientRect();
    const shouldStick =
      containerBound.height < rootBound.height &&
      rootBound.top + offset < 0;

    if (!shouldStick) {
      applyStyles(this.container);
      return this.setState({ state: initial });
    }
    if (rootBound.bottom <= minHeight) {
      applyStyles(this.container, { minHeight, width: rootBound.width });
      return this.setState({ state: stuck });
    };

    const height = rootBound.bottom - offset;
    applyStyles(this.container, { width: rootBound.width, maxHeight: height })
    return this.setState({ state: sticky });
  }

  render() {
    const { children } = this.props;
    
    return factory({
      ...this.state,
      ...this.props,
      registerRoot: this.registerRoot,
      registerContainer: this.registerContainer
    })
  }
}

export default withTheme(styles)(Sticky);
