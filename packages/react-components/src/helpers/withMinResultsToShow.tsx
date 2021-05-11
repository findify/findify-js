import { useMemo } from 'react';

/**
 * withMinResultsToShow allows you to only show component,
 * when it either has no minResultsToShow on its configuration, or when it has minResultsToShow and
 * number of items provided to component is either equal or exceeds minResultsToShow configuration value
 * @param BaseComponent view you will be adding minResultsToShow functionality to
 * @returns MinResultsToShow-enhanced HOC
 */
export default () => (BaseComponent) => (props) => {
  const shouldRender = useMemo(() => {
    const minResultsToShow = props.config.get('minResultsToShow');
    return (
      !minResultsToShow || (props.items && props.items.size >= minResultsToShow)
    );
  }, [props.items]);
  return shouldRender && <BaseComponent {...props} />;
};
