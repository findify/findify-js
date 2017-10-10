import * as React from 'react';
import { compose, defaultProps, mapProps, componentFromProp } from 'recompose';

export interface OwnProps {
  name: string;
  width?: number;
  height?: number;
  className?: string;
  onClick?: () => void;
  style?: any;
}

export type MappedProps = {
  width: number;
  height: number;
};

export type Props = OwnProps & MappedProps;

const getIcon = (name: string) =>
  require(`!!babel-loader!react-svg-loader!./icons/${name}.svg`).default;

const Icon = compose<OwnProps, Props>(
  defaultProps<MappedProps>({
    width: 16,
    height: 16,
  }),
  mapProps<OwnProps, Props>((props: Props) => ({
    onClick: props.onClick,
    style: props.styles,
    className: props.className,
    width: props.width,
    height: props.height,
    component: getIcon(props.name),
  }))
)(componentFromProp('component'));

export default Icon;
