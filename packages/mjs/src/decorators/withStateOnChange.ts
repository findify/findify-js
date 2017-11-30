import { Component, createFactory } from 'react';
import { setDisplayName, wrapDisplayName } from 'recompose';

const withStateOnChange = (
  stateName,
  stateUpdaterName,
  initialState,
  prop,
  onReceiveProps
) => BaseComponent => {
  const factory = createFactory(BaseComponent);
  class WithStateOnChange extends Component<any, any> {
    state = {
      stateValue:
        typeof initialState === 'function'
          ? initialState(this.props)
          : initialState,
    };

    componentWillReceiveProps(nextProps) {
      if (this.props[prop] !== nextProps[prop]) {
        this.updateStateValue(onReceiveProps(nextProps));
      }
    }

    updateStateValue = (updateFn, callback?) =>
      this.setState(
        ({ stateValue }) => ({
          stateValue:
            typeof updateFn === 'function' ? updateFn(stateValue) : updateFn,
        }),
        callback
      );

    render() {
      return factory({
        ...this.props,
        [stateName]: this.state.stateValue,
        [stateUpdaterName]: this.updateStateValue,
      });
    }
  }

  if (process.env.NODE_ENV !== 'production') {
    return setDisplayName(wrapDisplayName(BaseComponent, 'withStateOnChange'))(
      WithStateOnChange
    );
  }
  return WithStateOnChange;
};

export default withStateOnChange;
