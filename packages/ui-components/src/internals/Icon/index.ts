import { compose, defaultProps, mapProps, componentFromProp } from 'recompose';
import { memoize } from 'lodash';

const Icon: any = compose(
  defaultProps({
    width: 16,
    height: 16,
  }),
  mapProps(({ name, ...rest }) => {
    return {
      ...rest,
      component: require(`!!babel-loader!react-svg-loader!./icons/${name}.svg`)
        .default,
    };
  }),
)(componentFromProp('component'));

export default Icon;
