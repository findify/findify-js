/**
 * @module components/common/Sticky
 */

import { Component, createFactory, useRef, useState, useEffect } from 'react';
import withTheme from 'helpers/withTheme';

import view from 'components/common/Sticky/view';
import styles from 'components/common/Sticky/styles.css';

const factory: any = createFactory(view);
const [initial, stuck, sticky] = ['static', 'stuck', 'sticky'];

/** Function used to apply sticky styles */
const applyStyles = (element, styles?) => {
  element.removeAttribute('style');
  for (const key in styles) {
    element.style[key] = styles[key] + 'px';
  }
};

/** Props that Sticky component accepts */
export interface IStickyProps {
  /** Offset for sticky */
  offset?: number;
  /** Minimal height */
  minHeight?: number;

  stickToTop?: boolean;
}

const Sticky = ({
  offset = 25,
  minHeight = 0,
  stickToTop,
  ...props
}: IStickyProps) => {
  const root = useRef(null);
  const sizer = useRef(null);
  const container = useRef(null);
  const [state, setState] = useState(initial);

  useEffect(() => {
    const handleScroll = () => {
      if (!container.current || !root.current) return;
      const rootBound = root.current.getBoundingClientRect();
      const containerBound = container.current.getBoundingClientRect();
      const { width } = sizer.current.getBoundingClientRect();

      const shouldStick = stickToTop
        ? rootBound.top - offset < 0
        : containerBound.height < rootBound.height &&
          rootBound.top - offset < 0;

      if (!shouldStick) {
        if (stickToTop) applyStyles(root.current);
        applyStyles(container.current);
        return setState(initial);
      }

      if (!stickToTop && rootBound.bottom <= minHeight) {
        applyStyles(container.current, { width, maxHeight: minHeight });
        return setState(stuck);
      }

      const height = rootBound.bottom - offset;
      const styles = {
        width,
        maxHeight:
          (height > window.innerHeight && window.innerHeight - offset) ||
          height,
        top: offset,
      };
      if (stickToTop) applyStyles(root.current, { height: rootBound.height });
      applyStyles(container.current, styles);
      return setState(sticky);
    };

    document.addEventListener('scroll', handleScroll, true);
    return () => {
      document.removeEventListener('scroll', handleScroll, true);
    };
  }, []);

  return factory({
    ...props,
    state,
    registerRoot: root,
    registerSizer: sizer,
    registerContainer: container,
  });
};

export default withTheme(styles)(Sticky);
