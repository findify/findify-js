import { createFactory, useRef, useState, useEffect } from "react";
import { useConfig } from '@findify/react-connect';

let cache = {};

const getPosition = (element) => {
  const { left, width } = element.getBoundingClientRect()
  return window.innerWidth < (left + width) ? 'right' : 'left';
}

export const usePosition = () => {
  const element = useRef(null);
  const { config } = useConfig();
  const [position, setPosition] = useState(cache[config.get('widgetKey')] || config.get('position') || 'left');
  
  useEffect(() => {
    if (!element.current || !!cache[config.get('widgetKey')]) return;
    const p = getPosition(element.current);
    cache[config.get('widgetKey')] = p;
    setPosition(p)
  }, [element]);
  return [position, !config.get('position') ? element : undefined];
}

export default BaseComponent => {
  const factory: any = createFactory(BaseComponent);
  return (props) => {
    const [position, innerRef] = usePosition(props.config);
    return factory({
      ...props,
      position,
      innerRef
    })
  }
}
