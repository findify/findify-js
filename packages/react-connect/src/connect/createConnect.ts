import { createFactory, Component, createElement } from "react";
import { Map, is } from 'immutable';
import { getDisplayName } from '../utils/getDisplayName';
import { shallowEqual } from '../utils/shallowEqual';
import mapValues from '../utils/mapValues';
import { Context } from '../provider/createProvider';
import memoizeOne from 'memoize-one';
const capitalize = s => s.charAt(0).toUpperCase() + s.slice(1);

/**
 * Used to create a Connector HOC, enhancing given BaseComponent with connector configuration-specific
 * props, which it will extract from provider located higher in the React tree
 * @param param0 Connector configuration
 */
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
  const factory: any = createFactory(BaseComponent);

  class Connect extends Component<any, any>{
    displayName: string;
    changeAction: any
    cachedHandlers = {}

    constructor(props){
      super(props);
      const $store = props.agent;
      if (!$store) {
        throw new Error(`
          Can't find Provider "${storeKey ? ' with key '+ storeKey : ''},
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
      const { analytics } = this.props;
      const mapped = mapProps && mapProps(
        changes,
        meta,
        this.changeAction,
        analytics
      );
      const state = { meta, ...(mapped || { [field]: changes }) }
      direct ? this.state = state : this.setState(state);
    }

    private handlers = mapValues(
      handlers,
      (createHandler, handlerName) => (...args) => {
        const cachedHandler = this.cachedHandlers[handlerName];
        if (cachedHandler) return cachedHandler(...args);

        const handler = createHandler({
          update: this.changeAction,
          analytics: this.props.analytics,
          ...this.state
        });

        this.cachedHandlers[handlerName] = handler;
        return handler(...args);
      }
    )

    componentWillMount() {
      this.props.agent.on(`change:${field}`, this.handleUpdate);
    }

    componentWillUnmount() {
      this.props.agent.off(this.handleUpdate);
    }

    shouldComponentUpdate(nextProps, nextState) {
      return (
        (!this.state[field] || !this.state[field].equals(nextState[field]) || !this.state.meta.equals(nextState.meta))
        || !!Object.keys(nextProps).find(key => !is(nextProps[key], this.props[key]))
      );
    }

    componentWillReceiveProps() {
      this.cachedHandlers = {}
    }

    makeHandlers = memoizeOne(state => {
      const { analytics } = this.props;
      return mapValues(
        handlers,
        (createHandler, handlerName) => (...args) => {
          const handler = createHandler({
            analytics,
            update: this.changeAction,
            ...state
          });

          return handler(...args);
        }
      )
    })

    render() {
      return factory(
        {
          ...this.state,
          ...this.props,
          ...this.makeHandlers(this.state),
          update: this.changeAction
        }
      )
    }
  }

  Connect.prototype.displayName = displayName;

  return (props) => createElement(Context.Consumer, null, (agents) =>
    createElement(Connect, { ...agents[storeKey], ...props })
  )
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
