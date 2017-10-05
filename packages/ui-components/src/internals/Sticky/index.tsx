import Stickyfill from 'stickyfill';
import { throttle } from 'lodash';
import * as cx from 'classnames';
import * as React from 'react';
import {
  compose,
  setDisplayName,
  withHandlers,
  lifecycle,
  withState,
} from 'recompose';

const styles = require('./styles.css');

export type OwnProps = {
  className?: string;
  style?: React.CSSProperties;
  children: React.ReactChild;
};

export type Handlers = {
  setRef(element: HTMLDivElement): void;
  setSticky(on: boolean): void;
  onScroll(event: Event): void;
};

export type State = {
  isSticky?: boolean;
  target?: HTMLDivElement;
  style?: React.CSSProperties;
  stickOnTop: boolean;
  stickOnBottom: boolean;
  scrollTop: number;
};

export type Props = OwnProps &
  Handlers & {
    state: State;
    setState(state: State): State;
  };

export const Sticky = compose<OwnProps, Props>(
  setDisplayName('Sticky'),
  withState('state', 'setState', () => ({
    target: null,
    isSticky: false,
    stickOnTop: false,
    stickOnBottom: false,
    style: {},
    scrollTop: window.pageYOffset || document.documentElement.scrollTop,
  })),
  withHandlers({
    setSticky: ({ state }: Props) => (on: boolean) => {
      if (!state.target) return;
      if (on && !state.isSticky) {
        Stickyfill.add(state.target);
      } else if (!on && state.isSticky) {
        Stickyfill.remove(state.target);
      }
    },
    setRef: ({ state, setState }: Props) => (target: HTMLDivElement) => {
      if (!state.target && target) {
        setState({ ...state, target });
      }
    },
    onScroll: ({ state, setState }: Props) =>
      throttle((event: Event) => {
        if (!state.target) return;
        const rect = state.target.children[0].getBoundingClientRect();
        const windowHeight =
          window.innerHeight || document.documentElement.clientHeight;
        const scrollTop =
          window.pageYOffset || document.documentElement.scrollTop;
        const delta = scrollTop - state.scrollTop;
        const isScrollingDown = delta > 0;

        const stickOnBottom = rect.bottom < windowHeight;
        const stickOnTop = !isScrollingDown && rect.top >= 0;

        let style = {};
        if (stickOnBottom) {
          style = { bottom: 0 };
        } else if (stickOnTop) {
          style = { top: 0 };
        }
        setState({ ...state, scrollTop, style, stickOnTop, stickOnBottom });
      }, 200),
  }),
  lifecycle<Props, State>({
    componentDidMount() {
      window.addEventListener('scroll', this.props.onScroll, false);
      this.props.setSticky(true);
    },
    componentWillMount() {
      this.props.setSticky(false);
      window.removeEventListener('scroll', this.props.onScroll, false);
    },
  })
)(({ className, style, state, children, setRef }: Props) => (
  <div
    className={cx(styles.sticky, className, {
      [styles.top]: state.stickOnTop,
      [styles.bottom]: state.stickOnBottom,
    })}
    style={{ ...style, ...state.style }}
    ref={setRef}
  >
    {children}
  </div>
));
