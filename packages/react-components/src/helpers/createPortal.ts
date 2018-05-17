import { createElement, Component } from 'react';
import { createPortal as reactCreatePortal } from 'react-dom';

/**
 * Creates element for the portal to render into
 * @returns HTML element to pass to React
 */
const createRoot = (): HTMLDivElement => {
  const div = document.createElement('div');
  div.className = 'findify-portal';
  document.body.appendChild(div);
  return div;
}

class Portal extends Component<any>{
  element: any;

  static displayName = 'BodyRender';

  constructor(props) {
    super(props);
    this.element = createRoot();
  }

  componentDidMount() {
    document.body.appendChild(this.element);
  }

  componentWillUnmount() {
    document.body.removeChild(this.element);
  }

  render() {
    return reactCreatePortal(createElement(this.props.children), this.element)
  }
}


export const createPortal = (children, extraProps = {}) => createElement(Portal, { children, ...extraProps });
