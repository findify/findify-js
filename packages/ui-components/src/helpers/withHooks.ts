import { compose, branch, lifecycle, mapProps, getContext } from 'recompose';
import { findDOMNode } from 'react-dom';
import { identity, isObject, isFunction, isArray, isEqual } from 'lodash';
import PropTypes from 'prop-types';

const types = {
  mapProps: 'mapProps',
  didUpdate: 'didUpdate',
  didMount: 'didMount',
};

const splitProps = props =>
  Object.keys(props).reduce(
    (acc, key) => {
      const index = isFunction(props[key]) ? 1 : 0;
      const update = { ...acc[index], [key]: props[key] };
      acc[index] = update;
      return acc;
    },
    [{}, {}]
  );

const check = (type, hookName) => ({ hooks }) =>
  hooks && hooks[type] && hooks[type][hookName];

const createHook = type => (hookName, decorator) =>
  branch(check(type, hookName), decorator, identity);

const reflect = (fn, ...args) => {
  try {
    return fn(...args);
  } catch (e) {
    console.error(e.stack);
    return null;
  }
};

export default featureType => BaseComponent => {
  const hook = createHook(featureType);

  return compose(
    getContext({
      hooks: PropTypes.object,
      globalConfig: PropTypes.object,
      trackEvent: PropTypes.func,
    }),
    hook(
      types.didUpdate,
      lifecycle({
        componentDidMount() {
          reflect(
            this.props.hooks[featureType][types.didUpdate],
            {
              node: findDOMNode(this),
              data: this.props,
            },
            this.props.globalConfig
          );
        },
        componentDidUpdate(next) {
          if (isEqual(this.props, next)) return;
          reflect(
            this.props.hooks[featureType][types.didUpdate],
            {
              node: findDOMNode(this),
              data: this.props,
            },
            this.props.globalConfig
          );
        },
      })
    ),
    hook(
      types.mapProps,
      mapProps((props: any) => {
        const { hooks, globalConfig, ...restProps } = props;
        const propsToMap = splitProps(restProps);
        const mappedProps = reflect(
          hooks[featureType][types.mapProps],
          ...propsToMap,
          globalConfig
        );

        if (
          !mappedProps ||
          !isObject(mappedProps) ||
          mappedProps === propsToMap
        )
          return props;
        return {
          ...props,
          ...mappedProps,
        };
      })
    ),
    hook(
      types.didMount,
      lifecycle({
        componentDidMount() {
          reflect(
            this.props.hooks[featureType][types.didMount],
            {
              node: findDOMNode(this),
              data: this.props,
            },
            this.props.globalConfig
          );
        },
      })
    )
  )(BaseComponent);
};
