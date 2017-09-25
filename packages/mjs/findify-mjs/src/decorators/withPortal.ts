import {
  unstable_renderSubtreeIntoContainer as render,
  unmountComponentAtNode as unmount,
} from 'react-dom';
import {
  lifecycle,
  createEagerFactory,
  branch,
  setDisplayName,
} from 'recompose';
import { identity } from 'lodash';

const withPortal = (component, renderForProp) => {
  let isMounted = false;
  const factory = createEagerFactory(component);
  const callback = (...args) => {};

  return lifecycle({
    componentWillMount() {
      isMounted = true;
      this.targetNode = document.createElement('div');
      this.targetNode.className = 'findify-root';
      document.getElementsByTagName('body')[0].appendChild(this.targetNode);

      render(this, factory(this.props), this.targetNode, callback);
    },
    componentDidUpdate() {
      render(this, factory(this.props), this.targetNode, callback);
    },
    componentWillUnmount() {
      isMounted = false;
      unmount(this.targetNode);
    },
  });
};

/**
 * Will create additional react-root, and insert component there
 * @param Component
 * @param will be initialized only is this prop is present
 */
export default setDisplayName('withPortal')(withPortal);
