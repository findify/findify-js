import { createElement } from 'react';
import { compose, defaultProps } from 'recompose';
import withNodeState from '../decorators/withNodeState';
import withLocationManager from '../decorators/withLocationManager';
import watchIsMobile from '../decorators/watchIsMobile';
import connectProvider from '../decorators/connectProvider';
import withFakeHandlers from '../decorators/withFakeHandlers';
import withFakeLocation from '../decorators/withFakeLocation';
import postProcess from '../decorators/postProcess';

/**
 * Global components are self generated and could be used
 * on external web-sited
 */
const createGlobalComponent = ({
  type,
  node,
  config,
  hooks,
  analytics,
  initialHTML,
  decorators,
  provider,
}) =>
  compose(
    defaultProps({ config, hooks, analytics }),
    withLocationManager(config, hooks),
    withNodeState({ node, initialHTML }),
    watchIsMobile(config),
    connectProvider(provider),
    ...decorators,
    postProcess
  );

/**
 * Inline components are buddy components which you can use
 * in tests or in react app
 */
const createInlineComponent = ({
  type,
  node,
  config,
  hooks,
  analytics,
  decorators,
  provider,
}) =>
  compose(
    defaultProps({ inline: true }),
    withFakeHandlers({ config }),
    withFakeLocation,
    withNodeState(),
    connectProvider(provider),
    ...decorators
  );

export default ({ appendTo, component, provider }: IFeatureCreator) => (
  ...decorators
) => ({ inline = false, ...props }: any) =>
  inline
    ? createInlineComponent({ ...props, provider, decorators })(component)
    : {
        appendTo,
        Component: createElement(
          createGlobalComponent({ ...props, provider, decorators })(component)
        ),
      };

type IFeatureCreator = {
  appendTo?: string;
  component: any;
  provider?: any;
};
