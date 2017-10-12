import * as React from 'react';
import {
  compose,
  setDisplayName,
  defaultProps,
  mapProps,
  componentFromProp,
} from 'recompose';

export interface OwnProps {
  name: string;
  width?: number;
  height?: number;
  style?: React.CSSProperties;
  className?: string;
  onClick?: React.MouseEventHandler<any>;
}

export interface MappedProps {
  width: number;
  height: number;
}

export type Props = OwnProps & MappedProps;

const getIcon = (name: string) =>
  require(`!!babel-loader!react-svg-loader!./icons/${name}.svg`).default;

export default compose<Props, OwnProps>(
  setDisplayName('Icon'),
  defaultProps<MappedProps>({
    width: 16,
    height: 16,
  }),
  mapProps<MappedProps, Props>((props: Props) => ({
    onClick: props.onClick,
    style: props.style,
    className: props.className,
    width: props.width,
    height: props.height,
    component: getIcon(props.name),
  }))
)(componentFromProp('component'));
