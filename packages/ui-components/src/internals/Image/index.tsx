import * as React from 'react';
import {
  compose,
  lifecycle,
  onlyUpdateForKeys,
  pure,
  withProps,
  mapProps,
  withState,
} from 'recompose';
import * as cx from 'classnames';
import { defer } from 'lodash';

const styles = require('./styles.css');

export interface OwnProps {
  src: string;
  alt?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLImageElement>;
}

export interface State {
  isMounted: boolean;
  isLoading: boolean;
  setIsMounted: (isMounted: boolean) => void;
  setIsLoading: (isLoading: boolean) => void;
}

export type MappedProps = OwnProps & { src?: string };
export type Props = MappedProps & State;

const ImageComponent = compose<OwnProps, Props>(
  pure,
  withState('isLoading', 'setIsLoading', true),
  withState('isMounted', 'setIsMounted', true),
  lifecycle<OwnProps & State, OwnProps & State>({
    componentWillMount() {
      const img = new Image();
      img.onload = (ev: Event) =>
        this.props.isMounted && this.props.setIsLoading(false);
      img.src = this.props.src;
    },
    componentWillUnmount() {
      this.props.setIsMounted(false);
    },
  }),
  mapProps(
    ({ isLoading, className, src, alt, setIsLoading, onClick }: Props) => ({
      alt,
      onClick,
      src: isLoading ? undefined : src,
      className: cx(className, (isLoading && styles.loading) || styles.loaded),
    })
  ),
  onlyUpdateForKeys(['src'])
)(props => <img {...props} />);

export default ImageComponent;
