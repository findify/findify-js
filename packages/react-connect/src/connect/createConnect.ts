import { Component, createFactory } from "react";
import * as PropTypes from 'prop-types';
import { getDisplayName } from '../utils/getDisplayName';
import { shallowEqual } from '../utils/shallowEqual';
import mapValues from '../utils/mapValues';

const _empty = {};
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
      $findify: PropTypes.object.isRequired,
      $analytics: PropTypes.object.isRequired
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
          analytics: this.context.$analytics,
          meta: this.state.meta
        });

        this.cachedHandlers[handlerName] = handler;
        return handler(...args);
      }
    )

    componentWillMount() {
      const $store = this.context.$findify[storeKey];

      if (!$store) {
        throw new Error(`
          Can't find Provider "${feature}"${key ? ' with key '+ key : ''},
          You should create provider with correct Agent, or set "storeKey"
        `);
        return;
      }
      this.changeAction = $store.set.bind($store);
      $store.on(`change:${field}`, this.handleUpdate);
      this.setState({
        meta: $store.response.get('meta'),
        [field]: $store.response.get(field)
      });
    }

    componentWillUnmount() {
      this.context.$findify[feature].off(this.handleUpdate);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        (this.state[field] && !this.state[field].equals(nextState[field]))
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
        meta: this.state.meta || _empty,
        [field]: this.state[field]
      });
    }
  }

  return Connect;
}

export default ({
  feature,
  field,
  handlers,
  mapProps
}: {
  feature: string,
  field: string,
  handlers?: any,
  mapProps?: () => void
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
