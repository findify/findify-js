import { createPortal } from 'react-dom';
import * as React from 'react';

import { lifecycle, branch, setDisplayName } from 'recompose';

const portalCreator = (component, node) => props =>
  createPortal(component(props), node);

const withPortal = (component, _target) => BaseComponent => {
  const body = document.getElementsByTagName('body')[0];
  const target = _target || body;
  const factory = React.createFactory(component);

  const node = document.createElement('div');
  node.className = 'findify-root';

  const Portal = portalCreator(factory, node);

  return class extends React.Component {
    componentDidMount() {
      target.appendChild(node);
    }

    componentWillUnmount() {
      target.removeChild(node);
    }

    render() {
      return [
        <BaseComponent key="base" {...this.props} />,
        <Portal key="portal" {...this.props} />,
      ];
    }
  };
};

/**
 * Will create additional react-root, and insert component there
 * @param Component
 * @param will be initialized only is this prop is present
 */
export default setDisplayName('withPortal')(withPortal);
