import { createElement, Component } from 'react';
import { createPortal as reactCreatePortal } from 'react-dom';

const createRoot = () => {
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


export const createPortal = (children) => createElement(Portal, { children });
