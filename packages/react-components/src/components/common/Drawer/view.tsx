/**
 * @module components/common/Drawer
 */

import React from 'react';
import { Spring, config } from 'react-spring';
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

export default class DrawerView extends React.Component<IDrawerViewProps, IDrawerViewState> {
  state = { open: false };
  mounted = false;
  originalScrollTop: number = 0;

  static defaultProps = {
    options: {
      from: { transform: `translate3d(-100%, 0, 0)` },
      to: { transform: `translate3d(0%, 0, 0)` },
    }
  }

  componentDidMount() {
    this.originalScrollTop = window.scrollY;
    document.querySelector('body')!.classList.add(this.props.theme.bodyNoScroll);
    document.addEventListener('keydown', this.handleEscapeKeypress);
    this.mounted = true;
    requestAnimationFrame(() => {
      if (this.mounted) this.setState({ open: true })
    })
  }

  componentWillUnmount() {
    document.querySelector('body')!.classList.remove(this.props.theme.bodyNoScroll)
    document.removeEventListener('keydown', this.handleEscapeKeypress);
    window.scrollTo(0, this.originalScrollTop);
    this.originalScrollTop = 0;
    this.mounted = false;
  }

  close = () => {
    const { hideModal, name } = this.props;
    this.setState({ open: false }, () => setTimeout(() => hideModal(name), 400));
  }

  handleEscapeKeypress = (evt) => {
    if (evt.key !== 'Escape') return;
    this.close()
  }

  render() {
    const { open } = this.state;
    const { theme, options, children, ...rest } = this.props;
    return (
      <Spring
        from={{ opacity: 0 }}
        to={{ ...(open ? options.to : options.from), opacity: open ? 1 : 0  }}
        config={config[options.easing || 'default']}
      >
      {
        ({ opacity, ...style }) =>
          <>
            <div className={theme.backdrop} onClick={this.close} style={{ opacity }} />
            <div className={cx(theme.content, options.className)} style={style}>
              {
                children instanceof Function
                ? children({ ...rest, hideModal: this.close })
                : children
              }
            </div>
          </>
      }
      </Spring>
    )
  }
}
