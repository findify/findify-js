import { Component, createElement } from 'react';
import PropTypes from 'prop-types';
import {
  compose,
  lifecycle,
  getContext,
  createEagerFactory,
  branch,
  renderComponent,
} from 'recompose';
import { delay, identity } from 'lodash';

const resize = (win, doc, onResize) => {
  const resizeEvent = doc.createEvent('HTMLEvents');
  resizeEvent.initEvent('resize', true, true);

  return () => {
    // Fix initial frame height in IE9
    delay(() => onResize(doc.body.offsetWidth, doc.body.offsetHeight), 200);

    win.dispatchEvent(resizeEvent);
    return;
  };
};

const proxyClick = () => {
  const clickEvent = document.createEvent('HTMLEvents');
  clickEvent.initEvent('mousedown', true, true);
  return () => document.body.dispatchEvent(clickEvent);
};

const withPostProcess = BaseComponent => {
  const factory = createEagerFactory(BaseComponent);

  return class PostProcessor extends Component<any, any> {
    resize = () => {};
    proxyClick = () => {};

    static contextTypes = {
      window: PropTypes.any,
      document: PropTypes.any,
    };

    componentDidMount() {
      const { document: iframeDocument, window: iframeWindow } = this.context;

      this.resize = resize(iframeWindow, iframeDocument, this.props.onResize);
      this.proxyClick = proxyClick();

      if (
        ['complete', 'loaded', 'interactive'].includes(
          iframeDocument.readyState,
        ) &&
        iframeDocument.body
      ) {
        this.resize();
      } else {
        iframeDocument.addEventListener('DOMContentLoaded', this.resize, false);
      }

      if (this.props.config.featureType !== 'autocomplete') {
        iframeWindow.addEventListener('mousedown', this.proxyClick);
      }
    }

    componentWillUnmount() {
      const { document: iframeDocument, window: iframeWindow } = this.context;
      iframeDocument.removeEventListener('DOMContentLoaded', this.resize);
      iframeWindow.removeEventListener('mousedown', this.proxyClick);
    }

    render() {
      return factory(this.props);
    }
  };
};

export default branch(({ config }) => !config.frameDisabled, withPostProcess);
