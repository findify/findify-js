import { Component, createElement } from 'react';
import { debounce } from 'lodash';

class FeatureCreator extends Component<any>{
  initial: any;

  static displayName = 'FeatureCreator';

  state = { component: null };

  constructor(props) {
    super(props);
    const { widget, updater } = props;
    this.initial = updater(widget, this.callback);
    this.state = { component: this.initial };
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

  render() {
    return this.state.component;
  }
}

export const createFeature = (widget) =>
  createElement(FeatureCreator, {
    widget,
    updater: require(`./${widget.type}`).default
  });
