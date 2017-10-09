import * as React from 'react';
import { compose, defaultProps, mapProps, componentFromProp } from 'recompose';

export interface OwnProps {
  name: string;
  width?: number;
  height?: number;
}

export type MappedProps = {
  width: number;
  height: number;
};

export type Props = OwnProps & MappedProps;

const svgLoader = '!!babel-loader!react-svg-loader!./icons/';
const getIcon = (name: string) => require(`${svgLoader}${name}.svg`).default;

const Icon = compose<OwnProps, Props>(
  defaultProps<MappedProps>({
    width: 16,
    height: 16,
  }),
  mapProps<OwnProps, Props>((props: Props) => ({
    width: props.width,
    height: props.height,
    component: getIcon(props),
  }))
)(componentFromProp('component'));

export default Icon;
