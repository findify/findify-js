import { Component, createElement } from 'react';
import { debounce } from 'lodash';

class FeatureCreator extends Component<any>{
  initial: any;

  static displayName = 'FeatureCreator';

  state = { component: null };

  constructor(props) {
    super(props);
    const { entity, updater } = props;
    this.initial = updater(entity, this.callback);
    this.state = { component: this.initial };
  }

  callback = (_component, props, children) => {
    let component;
    if (!_component) component = null;
    if (_component === 'initial') component = this.initial;
    if (typeof _component === 'object') component = createElement(_component, props, children);

    this.setState({ component });
  }

  shouldComponentUpdate(_, next) {
    return next.component !== this.state.component;
  }

  render() {
    return this.state.component;
  }
}

export const createFeature = (entity) =>
  createElement(FeatureCreator, {
    entity,
    updater: require(`./${entity.type}`).default
  });
