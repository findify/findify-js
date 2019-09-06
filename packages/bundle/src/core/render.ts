import { Component, createElement, useState, useEffect, useMemo } from 'react';
import { render, createPortal } from 'react-dom';
import { createFeature } from '../features/create';
import { getParentNode } from '../helpers/getParentNode';
import { debounce } from '../helpers/debounce';
import { Events } from './events';

const createRoot = () => {
  const div = document.createElement('div');
  div.id = 'findify-root';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}

const Portal = ({ widget }) => {
  const [element, component, parent] = useMemo(() => {
    const element = document.createElement('div');
    element.className = `findify-container ${widget.config.get('cssSelector')}`;;
    return [
      element,
      createFeature(widget),
      getParentNode(widget)
    ]
  }, [])

  useEffect(() => {
    if (widget.type === 'tabs') {
      parent.insertBefore(element, parent.firstChild);
    } else {
      parent.appendChild(element);
    }
    return () => parent.removeChild(element)
  }, [widget])

  return useMemo(() => createPortal(component, element), []);
}

const RootElement = ({ widgets }) => {
  const [state, setState] = useState(widgets.list());
  useEffect(() => {
    __root.listen((event, widget) => {
      if (event === Events.attach) {
        setState([...state, widget])
      }
      if (event === Events.detach) {
        setState(state.filter(({ key }) => key !== widget.key))
      }
    })
  }, [])
  return useMemo(() => state.map((widget: any) => 
    createElement(Portal, { widget, key: widget.key })
  ), [state]);
}

export const renderWidgets = debounce((widgets) =>
  render(createElement(RootElement, { widgets }), createRoot())
);
