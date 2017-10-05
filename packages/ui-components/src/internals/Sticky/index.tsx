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
};

export type State = {
  isSticky?: boolean;
  target?: HTMLDivElement;
  style?: React.CSSProperties;
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
  }),
  lifecycle<Props, State>({
    componentDidMount() {
      this.props.setSticky(true);
    },
    componentWillMount() {
      this.props.setSticky(false);
    },
  })
)(({ className, style, state, children, setRef }: Props) => (
  <div
    className={cx(styles.sticky, className)}
    style={{ ...style, ...state.style }}
    ref={setRef}
  >
    {children}
  </div>
));
