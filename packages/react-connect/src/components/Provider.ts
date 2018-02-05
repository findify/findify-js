import { Component, Children } from "react";
import * as PropTypes from 'prop-types';

const providers = {};

export default class Provider extends Component<any, any>{
  type: string;

  static propTypes = {
    agent: PropTypes.object.isRequired,
    analytics: PropTypes.object.isRequired,
    storeKey: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
  }

  static childContextTypes = {
    $findify: PropTypes.object.isRequired,
    $analytics: PropTypes.object.isRequired
  }

  constructor(props, context) {
    super(props, context);
    this.type = `${props.agent.type}`;
    providers[`${props.agent.type}${this.props.storeKey || ''}`] = props.agent;
  }

  getChildContext() {
    return { $findify: providers, $analytics: this.props.analytics }
  }

  render() {
    return Children.only(this.props.children)
  }
}
