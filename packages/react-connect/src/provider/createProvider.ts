import { Component, Children } from "react";
import * as Agents from '@findify/agent';
import analytics from '@findify/analytics';
import { $findify, $analytics } from '../symbols';

import * as PropTypes from 'prop-types';

const agents = {};

export const createProvider = (type, onCreate?: (agent) => void) => {
  return class Provider extends Component<any, any>{
    type: string;
    storeKey: string;
    analytics: any;
    agent: any;

    static propTypes = {
      apiKey: PropTypes.string.isRequired,
      agent: PropTypes.object,
      defaults: PropTypes.object,
      options: PropTypes.object,
      onChangeQuery: PropTypes.func,
      storeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    static childContextTypes = {
      [$findify]: PropTypes.object.isRequired,
      [$analytics]: PropTypes.object.isRequired
    }

    constructor(props, context) {
      super(props, context);
      const { apiKey, agent, options, defaults } = props;
      this.update = this.update.bind(this);

      this.storeKey = `${type}${this.props.storeKey || ''}`;
      this.analytics = analytics({ key: apiKey });
      this.agent = agent || new Agents[type]({
        key: apiKey,
        user: this.analytics.user,
        immutable: true,
        ...options
      });
  
      if (onCreate) onCreate(this.agent)
      if (defaults) this.agent.defaults(defaults);
  
      agents[`${type}${this.props.storeKey || ''}`] = this.agent;
    }

    getChildContext() {
      return { [$findify]: agents, [$analytics]: this.analytics }
    }

    componentDidMount() {
      if (this.props.onChangeQuery) {
        this.agent.on('change:query', this.props.onChangeMeta)
      }
    }

    componentWillUnmount() {
      this.agent.off()
      agents[this.storeKey] = null;
    }

    public update(...args) {
      this.agent.update(...args);
    }
  
    render() {
      return Children.only(this.props.children)
    }
  }
}
