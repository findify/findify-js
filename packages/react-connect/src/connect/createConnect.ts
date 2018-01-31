import { Component, createFactory } from "react";
import * as PropTypes from 'prop-types';
import { getDisplayName } from '../utils/getDisplayName';
import { shallowEqual } from '../utils/shallowEqual';
import mapValues from '../utils/mapValues';

const _empty = {};

export default ({
  feature,
  field,
  handlers,
  mapProps
}: {
  feature: string,
  field: string,
  handlers: any,
  mapProps: () => void
}) => {
  return BaseComponent => {
    const displayName = `Connect${field.toUpperCase()}(${getDisplayName(BaseComponent)})`;
    const factory: any = createFactory(BaseComponent);
    const storeKey = `$${feature}`;

    class Connect extends Component{
      changeAction: any
      cachedHandlers = {}
      state = {
        meta: undefined
      }

      static contextTypes = {
        [storeKey]: PropTypes.object.isRequired,
        analytics: PropTypes.object.isRequired
      };

      constructor(props, context){
        super(props, context);
        this.handleUpdate = this.handleUpdate.bind(this);
      }

      handleUpdate(changes, meta) {
        this.setState({ meta, [field]: changes })
      }

      private handlers = mapValues(
        handlers,
        (createHandler, handlerName) => (...args) => {
          const cachedHandler = this.cachedHandlers[handlerName];
          if (cachedHandler) return cachedHandler(...args);
          
          const handler = createHandler({
            change: this.changeAction,
            analytics: this.context.analytics,
            meta: this.state.meta
          });

          this.cachedHandlers[handlerName] = handler;
          return handler(...args);
        }
      )

      componentWillMount() {
        this.changeAction = this.context[storeKey].set.bind(this.context[storeKey]);
        this.context[storeKey].on(`change:${field}`, this.handleUpdate);
        this.setState({
          meta: this.context.response.get('meta'),
          [field]: this.context.response.get(field)
        });
      }

      componentWillUnmount() {
        this.context[feature].off(this.handleUpdate);
      }

      shouldComponentUpdate(nextProps, nextState) {
        return this.state[field]
          && !this.state[field].equals(nextState[field])
          || shallowEqual(nextProps, this.props);
      }

      componentWillReceiveProps() {
        this.cachedHandlers = {}
      }

      render() {
        return factory({
          ...this.props,
          ...this.handlers,
          meta: this.state.meta || _empty,
          [field]: this.state[field]
        });
      }
    }

    return Connect;
  }
};
