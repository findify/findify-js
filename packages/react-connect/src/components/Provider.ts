import { Component, Children } from "react";
import * as PropTypes from 'prop-types';

export default class Provider extends Component {
  type: string;

  static propTypes = {
    agent: PropTypes.object.isRequired,
    analytics: PropTypes.object.isRequired
  }

  static childContextTypes = {
    autocomplete: PropTypes.object,
    search: PropTypes.object,
    analytics: PropTypes.object
  }

  constructor(props, context) {
    super(props, context);
    this.type = `$${props.agent.type}`;
    this[this.type] = props.agent;
  }

  getChildContext() {
    return { [this.type]: this[this.type], analytics: this.props.analytics }
  }

  render() {
    return Children.only(this.props.children)
  }
}
