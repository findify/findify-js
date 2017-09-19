import { Component } from 'react';
import {
  compose,
  withPropsOnChange,
  lifecycle,
  createEagerFactory,
} from 'recompose';
import { identity } from 'lodash';

class FakeLocation {
  onChange = identity;
  listener = identity;
  _state = {};

  constructor(onChange, request = {}) {
    this.onChange = onChange;
    this._state = request;
  }
  setState(state) {
    this._state = state;
    return this;
  }
  navigate() {}
  searchFor(q) {
    this.onChange({ q });
  }
  listen(fn) {
    this.listener = fn;
  }
  set state(request) {
    this.onChange(request);
  }
  get state() {
    return this._state;
  }
}

export default BaseComponent => {
  const factory = createEagerFactory(BaseComponent);

  return class Location extends Component<any, any> {
    _location: any = void 0;

    constructor(props) {
      super(props);
      const { onChange, request } = props;
      this._location = new FakeLocation(onChange, request);
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.request !== this.props.request) {
        this._location.setState(nextProps.request).listener(nextProps.request);
      }
    }

    render() {
      return factory({ ...this.props, location: this._location });
    }
  };
};
