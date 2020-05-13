/**
 * @module components/common/Drawer
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useSpring, config, animated } from 'react-spring';
import cx from 'classnames';
import { ThemedSFCProps } from 'types';

/** This is a state definition for DrawerView */
export interface IDrawerViewState {
  /** Flag whether Drawer is open */
  open: boolean;
}

/** List of props that DrawerView accepts */
export interface IDrawerViewProps extends ThemedSFCProps {
  /** Additional options for DrawerView */
  options: {
    /** Transition from styles */
    from: {[x: string]: string | number}
    /** Transition to styles */
    to: {[x: string]: string | number}
    /** Easing mode */
    easing?: string;
    /** Custom className */
    className?: string;
  };
  /** Rest of the props, passed to children */
  [x: string]: any;
}

const defaultOptions = {
  from: { transform: `translate3d(-100%, 0, 0)` },
  to: { transform: `translate3d(0%, 0, 0)` },
};

let _scrollTop = 0;

const Drawer = ({ hideModal, name, theme, options = defaultOptions, children, ...rest }:IDrawerViewProps) => {
  const [open, setOpen] = useState(false);

  const { opacity, ...style } = useSpring({
    from: { opacity: 0 },
    to: { ...(open ? options.to : options.from), opacity: open ? 1 : 0 },
    config: config[options.easing || 'default']
  });

  const close = useCallback(() => {
    setOpen(false)
    setTimeout(() => hideModal(name), 400);
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key !== 'Escape') return;
      close()
    };

    _scrollTop = window.scrollY;
  
    document.querySelector('body')!.classList.add(theme.bodyNoScroll);
    document.addEventListener('keydown', handleEscape);

    requestAnimationFrame(() => setOpen(true));
  
    return () => {
      document.querySelector('body')!.classList.remove(theme.bodyNoScroll)
      document.removeEventListener('keydown', handleEscape);
      window.scrollTo(0, _scrollTop);
      _scrollTop = 0;
    }
  }, [])

  return (
    <>
      <animated.div className={cx('findify-container', theme.backdrop)} onClick={close} style={{ opacity }} />
      <animated.div
        className={cx('findify-container', theme.content, options.className)}
        style={style}
        role='region'
        aria-live='polite'
        area-modal='true'
        ref={r => r && r.focus()}>
        {
          children instanceof Function
          ? children({ ...rest, hideModal: close })
          : children
        }
      </animated.div>
    </>
  )
}
export default Drawer;
