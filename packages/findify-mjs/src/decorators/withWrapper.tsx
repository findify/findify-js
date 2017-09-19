import { createEagerFactory, setDisplayName } from 'recompose';

const withWrapper = Wrapper => BaseComponent => {
  const wrapperFactory = createEagerFactory(Wrapper);
  const componentFactory = createEagerFactory(BaseComponent);
  return props => wrapperFactory(props, componentFactory(props));
};

/**
 * Will wrap component with another component
 */
export default setDisplayName('withWrapper')(withWrapper);
