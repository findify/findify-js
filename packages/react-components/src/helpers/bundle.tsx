import React from 'react';
import { compose, branch, withStateHandlers, withContext, getContext } from "recompose";
import { object, func } from 'prop-types';
import pure from './pure';
import { List, is } from 'immutable';

const identity = i => i;

export const provideBundle =
  (getInitialItems = identity) =>
  BaseComponent =>
  class Provider extends React.Component{
    state = { inBundle: List() }
  
    static childContextTypes = {
      inBundle: object.isRequired,
      updateBundle: func.isRequired,
    }

    getChildContext() {
      return {
        inBundle: this.state.inBundle,
        updateBundle: this.updateBundle,
      }
    }

    updateBundle = (inBundle) => this.setState({ inBundle });

    componentWillReceiveProps(next){
      if (is(next.items, this.props.items)) return;
      this.updateBundle(getInitialItems(next.items));
    }
  
    render() {
      return <BaseComponent {...this.props} />
    }
  }

export const connectBundle = getContext({ inBundle: object.isRequired, updateBundle: func.isRequired });
