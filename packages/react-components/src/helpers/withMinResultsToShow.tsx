import React, { Component } from 'react';
import { is, List, Map } from 'immutable';
import { branch, compose, withPropsOnChange, setDisplayName } from 'recompose';

/**
 * withLazy() returns a HOC for wrapping around component you want to add minimum results to show functionality to
 * @returns HOC, accepting a view you want to add minimum results to show functionality to
 */
export default function withMinResultsToShow() {

  /**
   * withMinResultsToShow allows you to only show component,
   * when it either has no minResultsToShow on its configuration, or when it has minResultsToShow and
   * number of items provided to component is either equal or exceeds minResultsToShow configuration value
   * @param BaseComponent view you will be adding minResultsToShow functionality to
   * @returns MinResultsToShow-enhanced HOC
   */
  return (BaseComponent: Component) => compose(
    setDisplayName('withMinResultsToShow'),
    withPropsOnChange(['items'], ({ items, config }) => {
      const minResultsToShow = config.get('minResultsToShow');
      if (typeof minResultsToShow !== 'undefined') return ({ shouldShow: items && items.size >= minResultsToShow })
      return ({ shouldShow: true })
    }),
    branch(
      ({ shouldShow }) => shouldShow,
      () => (props) => <BaseComponent {...props} />,
      () => () => null
    )
  )(() => null);
}
