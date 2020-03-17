import { Component, createElement, useCallback, useMemo, useState, useEffect, createFactory } from 'react';
import { Events } from '../core/events';

class FeatureCreator extends Component<any>{
  initial: any;
  unsubscribeForceUpdate: any;
  state = { component: null };

  static displayName = 'FeatureCreator';

  constructor(props) {
    super(props);
    const { widget, updater } = props;
    this.initial = updater(this.callback);
    this.state = { component: this.initial };

    this.unsubscribeForceUpdate = __root.listen((type, key, nextConfig) => {

      // Listen to modules invalidation
      if (type === Events.invalidate) this.invalidate();

      // Listen to config change
      if (type !== Events.updateConfig || key !== widget.key) return;
      widget.config = nextConfig;
      this.initial = updater(this.callback);
      this.setState({ component: this.initial });
    });
  }

  invalidate = async () => {
    const { widget } = this.props;
    const updater = require(`./${widget.type}`).default;
    this.initial = updater(widget)(this.callback);
    return this.setState({ component: this.initial });
  }

  callback = (_component, props, children) => {
    let component;
    if (!_component) component = null;
    if (_component === 'initial') component = this.initial;
    if (typeof _component === 'function') component = createElement(_component, props, children);
    this.setState({ component });
  }

  shouldComponentUpdate(_, next) {
    return next.component !== this.state.component;
  }

  componentDidCatch(e) {
    __root.sentry && __root.sentry.captureException(e)
  }

  componentWillUnmount() {
    this.unsubscribeForceUpdate();
  }

  render() {
    return this.state.component;
  }
}


export const createFeature = (widget) => {
  const updater = require(`./${widget.type}`).default(widget);
  return createElement(FeatureCreator, { widget, updater })
};
