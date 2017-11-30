import { createFactory } from 'react';
import { setDisplayName } from 'recompose';

const withWrapper = Wrapper => BaseComponent => {
  const wrapperFactory = createFactory(Wrapper);
  const componentFactory = createFactory(BaseComponent);
  return props => wrapperFactory(props, componentFactory(props));
};

/**
 * Will wrap component with another component
 */
export default setDisplayName('withWrapper')(withWrapper);
