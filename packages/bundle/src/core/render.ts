import { Component, createElement, useState, useReducer, useEffect, useMemo } from 'react';
import { render, hydrate, createPortal } from 'react-dom';
import { createFeature } from '../features/create';
import { getParentNode } from '../helpers/getParentNode';
import { debounce } from '../helpers/debounce';
import { Events } from './events';
import { documentReady } from '../helpers/documentReady';

const createRoot = () => {
  const meta = document.createElement('meta');
  meta.name = 'findify-root';
  document.head.appendChild(meta);
  return meta;
}

const Portal = ({ widget }) => {
  const [domReady, setDomReady] = useState(false);

  const [element, component] = useMemo(() => {
    const element = document.createElement('div');
    element.className = `findify-container ${widget.config.get('cssSelector')}`;
    return [
      element,
      createFeature(widget),
    ]
  }, [])

  useEffect(() => {
    documentReady.then(() => setDomReady(true));

    if (!domReady) return;

    const parent = getParentNode(widget);
  
    if (widget.type === 'tabs') {
      parent.insertBefore(element, parent.firstChild);
    } else {
      parent.appendChild(element);
    }
  
    return () => parent.removeChild(element)
  }, [widget, domReady])

  return useMemo(() => createPortal(component, element), [domReady]);
}

const reduceWidgets = (state, action) => {
  switch (action.type) {
    case 'attach':
      return [...state, action.widget];
    case 'detach':
      return state.filter(({ key }) => key !== action.key)
  }
}

const RootElement = ({ widgets }) => {
  const [state, dispatch] = useReducer(reduceWidgets, widgets.list());
  useMemo(() => {
    __root.listen((event, widget) => {
      if (event === Events.attach) {
        dispatch({ type: 'attach', widget })
      }
      if (event === Events.detach) {
        dispatch({ type: 'detach', key: widget.key })
      }
    })
  }, [])

  return useMemo(() => state.map((widget: any) => 
    createElement(Portal, { widget, key: widget.key })
  ), [state]);
}

export const renderWidgets = (widgets) => {
  render(createElement(RootElement, { widgets }), createRoot());
};
