import * as helpers from '@findify/helpers';
import { createFactory } from 'react';
import {
  compose,
  setDisplayName,
  defaultProps,
  withState,
  lifecycle,
  withHandlers,
} from 'recompose';

const connectHelpers = (Provider: IProvider) => BaseComponent => {
  let provider;
  let unsubscribe;

  const factory = createFactory(
    compose(
      withState('response', 'setStore', ({ state }) => state),
      withState('isLoading', 'setLoading', false),
      lifecycle({
        componentWillReceiveProps(nextProps) {
          if (nextProps.state !== this.props.state) {
            this.props.setStore(nextProps.state);
          }
        },

        componentWillMount() {
          unsubscribe = provider.subscribe(
            this.props.setStore,
            this.props.setLoading
          );
        },

        componentWillUnmount() {
          unsubscribe();
          provider = void 0;
        },
      }),
      withHandlers({
        trackEvent: ({ analytics, response }) => (
          name: string,
          data,
          useCookie = false
        ) =>
          analytics.sendEvent(
            name,
            {
              ...data,
              rid: (response && response.meta && response.meta.rid) || void 0,
            },
            useCookie
          ),
      })
    )(BaseComponent)
  );

  return props => {
    provider = provider ? provider : Provider(props);
    return factory({
      ...props,
      provider,
    });
  };
};

/**
 * Connect @findify/helpers to feature. Provider should have [subscribe] function,
 * which will be called on component mounting.
 * All other function will be available via prop.provider.*
 * @param Provider 
 */
export default setDisplayName('connectHelpers')(connectHelpers);

type IProvider = (
  config
) => {
  subscribe: (callback) => void;
};
