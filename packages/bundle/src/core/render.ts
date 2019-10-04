import { Component, createElement, useState, useEffect, useMemo } from 'react';
import { render, createPortal } from 'react-dom';
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

  const [element, component, parent] = useMemo(() => {
    const element = document.createElement('div');
    element.className = `findify-container ${widget.config.get('cssSelector')}`;;
    return [
      element,
      createFeature(widget),
      getParentNode(widget)
    ]
  }, [domReady])

  useEffect(() => {
    documentReady.then(() => setDomReady(true));

    if (!domReady) return;
  
    if (widget.type === 'tabs') {
      parent.insertBefore(element, parent.firstChild);
    } else {
      parent.appendChild(element);
    }
  
    return () => parent.removeChild(element)
  }, [widget, domReady])

  return useMemo(() => createPortal(component, element), [domReady]);
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
