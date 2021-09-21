import {
  createFactory,
  useRef,
  useState,
  useEffect,
  MutableRefObject,
} from 'react';

const cache = {};

const getPosition = (element) => {
  const { left, width } = element.getBoundingClientRect();
  return window.innerWidth < left + width ? 'right' : 'left';
};

export const usePosition = (
  config
): ['left' | 'right', MutableRefObject<any> | undefined] => {
  const element = useRef(null);
  const [position, setPosition] = useState(
    cache[config.get('widgetKey')] || config.get('position') || 'left'
  );

  useEffect(() => {
    if (!element.current || !!cache[config.get('widgetKey')]) return;
    const p = getPosition(element.current);
    cache[config.get('widgetKey')] = p;
    setPosition(p);
  }, [element]);
  return [position, config.get('position') === 'dynamic' ? element : undefined];
};

export default (BaseComponent) => {
  const factory: any = createFactory(BaseComponent);
  return (props) => {
    const [position, innerRef] = usePosition(props.config);
    return factory({
      ...props,
      position,
      innerRef,
    });
  };
};
