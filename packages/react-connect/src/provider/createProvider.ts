import { Component, Children } from "react";
import * as Agents from '@findify/agent';
import analytics from '@findify/analytics';
import { $findify, $analytics } from '../symbols';

import { object, string, number, oneOfType, func } from 'prop-types';

const agents = {};

export const createProvider = (type, onCreate?: (agent) => void) => {
  return class Provider extends Component<any, any>{
    type: string;
    storeKey: string;
    analytics: any;
    agent: any;

    static propTypes = {
      apiKey: string.isRequired,
      agent: object,
      defaults: object,
      options: object,
      onChangeQuery: func,
      storeKey: oneOfType([string, number])
    }

    static childContextTypes = {
      [$findify]: object.isRequired,
      [$analytics]: object.isRequired
    }

    constructor(props, context) {
      super(props, context);
      const { apiKey, agent, options, defaults } = props;
      const analyticsConfig: any = { key: apiKey };

      if (agent && !agent.immutable) {
        throw new Error(`
          Agent should be in "immutable" mode, to work with connectors.
          Add "immutable: true" to your Agent initializer
        `)
      }

      this.storeKey = this.props.storeKey;
      this.analytics = analytics(analyticsConfig);
      this.agent = agent || new Agents[type]({
        key: apiKey,
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
        [$findify]: {
          ...agents,
          ...(!this.storeKey && { default: this.agent })
        },
      }
    }

    componentDidMount() {
      if (this.props.onChangeQuery) {
        this.agent.on('change:query', this.props.onChangeMeta)
      }
    }

    componentWillUnmount() {
      this.agent.off()
      if (this.storeKey) agents[this.storeKey] = null;
    }

    update = (...args) => {
      this.agent.update(...args);
    }
  
    render() {
      return Children.only(this.props.children)
    }
  }
}
