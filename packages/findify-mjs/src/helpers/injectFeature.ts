import { render } from 'react-dom';
import registerHooks from './registerHooks';
import { mutateDom } from './appendFeature';

export default ({ features = {}, selectors = {}, ...rest }, analytics) => (
  node,
  { type, ...extras },
) => {
  const config = { ...rest, features, ...features[type], ...extras };
  const initialHTML = node.innerHTML;
  const featureCreator = require(`../features/${type}/index.tsx`).default;

  let componentDOMRoot;

  registerHooks({ type, config }, (config, hooks) => {
    const { appendTo, Component } = featureCreator({
      type,
      node,
      config,
      hooks,
      analytics,
      initialHTML,
    });
    componentDOMRoot = componentDOMRoot || mutateDom(node, appendTo);
    render(Component, componentDOMRoot);
  });
};
