import { Component, createFactory } from "react";
import * as PropTypes from 'prop-types';
import { getDisplayName } from '../utils/getDisplayName';
import { shallowEqual } from '../utils/shallowEqual';
import mapValues from '../utils/mapValues';
import { $findify, $analytics } from '../symbols';

const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

const createComponent = ({
  field,
  feature,
  handlers,
  mapProps,
  BaseComponent,
  key = ''
}: any) => {
  const storeKey = feature+key;
  const displayName = `Connect${capitalize(field)}(${getDisplayName(BaseComponent)})`;
  const factory: any = createFactory(BaseComponent);

  class Connect extends Component{
    changeAction: any
    cachedHandlers = {}
    state = {
      meta: undefined
    }

    static contextTypes = {
      [$findify]: PropTypes.object.isRequired,
      [$analytics]: PropTypes.object.isRequired
    };

    constructor(props, context){
      super(props, context);
    }

    handleUpdate = (changes, meta) => {
      const mapped = mapProps && mapProps(
        changes,
        meta,
        this.changeAction,
        this.context[$analytics]
      );
      this.setState({ meta, ...(mapped || { [field]: changes }) })
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
      const $store = this.context[$findify][storeKey];

      if (!$store) {
        throw new Error(`
          Can't find Provider "${feature}"${key ? ' with key '+ key : ''},
          You should create provider with correct Agent, or set "storeKey"
        `);
        return;
      }
      this.changeAction = $store.set;
      $store.on(`change:${field}`, this.handleUpdate);
      this.handleUpdate(
        field !== 'query' ? $store.response.get(field) : $store.state,
        $store.response.get('meta')
      );
    }

    componentWillUnmount() {
      this.context[$findify][feature].off(this.handleUpdate);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        (!this.state[field] || !this.state[field].equals(nextState[field]))
        || shallowEqual(nextProps, this.props)
      );
    }

    componentWillReceiveProps() {
      this.cachedHandlers = {}
    }

    render() {
      return factory({
        ...this.props,
        ...this.handlers,
        ...this.state,
        update: this.changeAction,
      });
    }
  }

  return Connect;
}

export default ({
  feature,
  field,
  handlers,
  mapProps,
}: {
  feature: string,
  field: string,
  handlers?: any,
  mapProps?: (field, meta, update, analytics) => void
}) =>
  (connector: any | { feature?: string, key?: string | number }): any =>
    typeof connector === 'function'
    ? createComponent({
        feature,
        field,
        handlers,
        mapProps,
        BaseComponent: connector
      })
      // tslint:disable-next-line:variable-name
    : BaseComponent =>
      createComponent({
        feature,
        field,
        handlers,
        mapProps,
        BaseComponent,
        ...connector
      })
