import { useState, useEffect, createElement, useRef } from "react"
import { useConfig } from '@findify/react-connect';

export const useIsMobile = () => {
  const { config } = useConfig();
  const mql = useRef(window.matchMedia(`(min-width: ${config.get('mobileBreakpoint')}px)`));

  const getValue = () => !mql.current.matches;
  const [isMobile, setIsMobile] = useState(getValue);

  useEffect(() => {
    const handler = () => setIsMobile(getValue);
    mql.current.addListener(handler);
    return () => mql.current.removeListener(handler);
  }, []);

  return isMobile;
}

export default BaseComponent => props => {
  const isMobile = useIsMobile();
  return createElement(BaseComponent, { ...props, isMobile })
}
