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

const ImageComponent: any = compose(
  pure,
  withState('isLoading', 'setIsLoading', true),
  withState('isMounted', 'setIsMounted', true),
  lifecycle({
    componentWillMount() {
      const img = new Image();
      img.onload = defer(
        () => this.props.isMounted && this.props.setIsLoading(false),
      );
      img.src = this.props.src;
    },
    componentWillUnmount() {
      this.props.setIsMounted(false);
    },
  }),
  mapProps(
    ({
      isLoading,
      className,
      src,
      alt,
      placeholder,
      setIsLoading,
      onClick,
      ...rest,
    }: any) => ({
      alt,
      onClick,
      src: isLoading ? void 0 : src,
      className: cx(className, (isLoading && styles.loading) || styles.loaded),
    }),
  ),
  onlyUpdateForKeys(['src']),
)(props => <img {...props} />);

export default ImageComponent;
