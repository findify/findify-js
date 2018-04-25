import { Component, createFactory, createElement } from "react";
import * as PropTypes from 'prop-types';
import { Map, is } from 'immutable';
import { getDisplayName } from '../utils/getDisplayName';
import { shallowEqual } from '../utils/shallowEqual';
import mapValues from '../utils/mapValues';
import { $findify, $analytics, $config } from '../symbols';

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const createComponent = ({
  field,
  feature,
  handlers,
  mapProps,
  BaseComponent,
  key = ''
}: any) => {
  const storeKey = !!key && key || 'default';
  const displayName = `Connect${capitalize(field)}(${getDisplayName(BaseComponent)})`;
  //const factory: any = createFactory(BaseComponent);

  class Connect extends Component{
    displayName: string;
    changeAction: any
    cachedHandlers = {}

    static contextTypes = {
      [$findify]: PropTypes.object.isRequired,
      [$analytics]: PropTypes.object.isRequired,
      [$config]: PropTypes.object.isRequired
    };

    constructor(props, context){
      super(props, context);
      const $store = context[$findify][storeKey];

      if (!$store) {
        throw new Error(`
          Can't find Provider "${key ? ' with key '+ key : ''},
          You should create provider with correct Agent, or set "storeKey"
        `);
      }
      this.changeAction = $store.set;
      this.handleUpdate(
        field !== 'query' ? $store.response.get(field) : $store.state,
        $store.response.get('meta'),
        true
      );
    }

    handleUpdate = (changes, meta = Map(), direct = false) => {
      const config = this.context[$config];
      const mapped = mapProps && mapProps(
        changes,
        meta,
        this.changeAction,
        this.context[$analytics]
      );
      const state = { meta, config, ...(mapped || { [field]: changes }) }
      direct ? this.state = state : this.setState(state);
    }

    private handlers = mapValues(
      handlers,
      (createHandler, handlerName) => (...args) => {
        const cachedHandler = this.cachedHandlers[handlerName];
        if (cachedHandler) return cachedHandler(...args);

        const handler = createHandler({
          update: this.changeAction,
          analytics: this.context[$analytics],
          ...this.state
        });

        this.cachedHandlers[handlerName] = handler;
        return handler(...args);
      }
    )

    componentWillMount() {
      this.context[$findify][storeKey].on(`change:${field}`, this.handleUpdate);
    }

    componentWillUnmount() {
      this.context[$findify][storeKey].off(this.handleUpdate);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        (!this.state[field] || !this.state[field].equals(nextState[field]))
        || !!Object.keys(nextProps).find(key => !is(nextProps[key], this.props[key]))
      );
    }

    componentWillReceiveProps() {
      this.cachedHandlers = {}
    }

    render() {
      return createElement(
        BaseComponent,
        {
          ...this.props,
          ...this.handlers,
          ...this.state,
          config: this.context[$config],
          update: this.changeAction
        }
      )
      /*
      return factory({
        ...this.props,
        ...this.handlers,
        ...this.state,
        config: this.context[$config],
        update: this.changeAction,
      });*/
    }
  }

  Connect.prototype.displayName = displayName;
  return Connect;
}

export default ({
  field,
  handlers,
  mapProps,
}: {
  field: string,
  handlers?: any,
  mapProps?: (field, meta, update, analytics) => void
}) =>
  (connector: any | { feature?: string, key?: string | number }): any =>
    typeof connector === 'function'
    ? createComponent({
        field,
        handlers,
        mapProps,
        BaseComponent: connector
      })
      // tslint:disable-next-line:variable-name
    : BaseComponent =>
      createComponent({
        field,
        handlers,
        mapProps,
        BaseComponent,
        ...connector
      })
