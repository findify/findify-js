// tslint:disable-next-line:import-name
import { PureComponent } from "react";
import { Map, is } from 'immutable';
import * as Agents from '@findify/agent';
import analytics from '@findify/analytics';
import { $analytics, $findify, $config } from '../symbols';

import { object, string, number, oneOfType, func, any } from 'prop-types';
import { config } from 'react-spring';

const agents = {};

/**
 * Used to create a Provider Component to be rendered with React to further pass down Agent data to Connectors
 * @param type Provider data type. Autocomplete, Search, SmartCollection, Content
 * @param onCreate Callback to be called with Agent instance once the provider has been initialized
 */
export const createProvider = (type, onCreate?: (agent) => void) => {
  return class Provider extends PureComponent<any, any>{
    type: string;
    storeKey: string;
    analytics: any;
    agent: any;
    nested: any;

    static propTypes = {
      apiKey: string,
      agent: object,
      defaults: object,
      options: object,
      config: object,
      onChangeQuery: func,
      storeKey: oneOfType([string, number]),
      query: object
    }

    static contextTypes = {
      [$findify]: object,
    };

    static childContextTypes = {
      [$findify]: object.isRequired,
      [$analytics]: object.isRequired,
      [$config]: object.isRequired
    }

    constructor(props, context) {
      super(props, context);
      const { apiKey, agent, options, defaults, config } = props;
      const _key = agent && agent.config.key || apiKey;
      const _config = config || Map();
      const analyticsConfig: any = {
        key: _key,
        events: _config.get('analytics', Map()).toJS(),
        ..._config.get('platform', Map()).toJS()
      };
    
      this.nested = context[$findify];

      if (agent && !agent.config.immutable) {
        throw new Error(`
          Agent should be in "immutable" mode, to work with connectors.
          Add "immutable: true" to your Agent initializer
        `)
      }

      this.storeKey = this.props.storeKey;
      this.analytics = analytics(analyticsConfig);
      this.state = { config: _config };
      this.agent = agent || new Agents[type]({
        key: _key,
        user: this.analytics.user,
        immutable: true,
        ...options
      });

      if (this.storeKey) agents[this.storeKey] = this.agent;
      if (onCreate) onCreate(this.agent)
      if (defaults) this.agent.defaults(defaults);
    }

    getChildContext() {
      return {
        [$analytics]: this.analytics,
        [$config]: this.state.config,
        [$findify]: {
          ...agents,
          ...this.nested,
          ...(!this.storeKey && { default: this.agent })
        },
      }
    }

    componentWillReceiveProps(next){
      if (
        typeof next.query !== 'object' ||
        this.props.query === next.query ||
        Object.keys(next.query).every(k =>
          is(this.props.query[k], next.query[k])
        )
      ) return;
      this.setQuery(next.query);
      if (!!next.agent && next.agent !== this.agent) {
        this.agent = next.agent
        this.forceUpdate()
      }
    }

    setQuery = (query) => {
      for (const key in query) this.agent.set(key, query[key]);
    }

    componentDidMount() {
      if (this.props.onChangeQuery) {
        this.agent.on('change:query', this.props.onChangeMeta)
      }
    }

    componentWillUnmount() {
      if (this.props.onChangeMeta) this.agent.off(this.props.onChangeMeta)
      if (this.storeKey) agents[this.storeKey] = null;
    }

    update = (...args) => {
      this.agent.update(...args);
    }

    render() {
      return this.props.children;
    }
  }
}
