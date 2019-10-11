import { useState, useEffect, useMemo, createElement } from "react"
import { useConfig } from '@findify/react-connect';

export const useIsMobile = () => {
  const { config } = useConfig();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= config.get('mobileBreakpoint'));
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= config.get('mobileBreakpoint'));
    window.addEventListener('resize', handleResize, true);
    return () => window.removeEventListener('resize', handleResize)
  }, []);

  return isMobile;
}

export default BaseComponent => props => {
  const isMobile = useIsMobile();
  return createElement(BaseComponent, { ...props, isMobile })
}
