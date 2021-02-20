import { createElement, useReducer, useEffect, useMemo } from 'react';
import { render, createPortal } from 'react-dom';
import { createFeature } from '../features/create';
import { getParentNode } from '../helpers/getParentNode';
import { Events } from './events';
import { createWidgetCreator } from '../helpers/createWidgetCreator';

const createRoot = () => {
  const meta = document.createElement('meta');
  meta.name = 'findify-root';
  document.head.appendChild(meta);
  return meta;
}

const Portal = ({ widget }) => {
  const [element, component] = useMemo(() => {
    const element = document.createElement('div');
    element.className = `findify-container ${widget.config.get('cssSelector')}`;
    return [
      element,
      createFeature(widget),
    ]
  }, [])

  useEffect(() => {
    if (!widget.node) return;

    const parent = getParentNode(widget);
  
    if (widget.type === 'tabs') {
      parent.insertBefore(element, parent.firstChild);
    } else {
      parent.appendChild(element);
    }
  
    return () => parent.removeChild(element)
  }, [widget.node])

  return useMemo(() => widget.node && createPortal(component, element), [widget.node]);
}

const reduceWidgets = (state, action) => {
  switch (action.type) {
    case 'attach':
      return [...state, createWidgetCreator(action.widget)];
    case 'update':
      console.log(state);
      return state.map((widget) =>
        widget.key === action.widget._key ? action.widget : widget
      )
    case 'detach':
      return state.filter(({ key }) => key !== action.key)
  }
}

const RootElement = ({ widgets }) => {
  const [state, dispatch] = useReducer(reduceWidgets, widgets);
  useMemo(() => {
    __root.listen((event, widget) => {
      if (event === Events.update) {
        dispatch({ type: 'update', widget })
      }
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

let isRendered = false;
export const renderWidgets = (widgets) => {
  if (isRendered) return;
  render(createElement(RootElement, { widgets }), createRoot());
  isRendered = true;
};
