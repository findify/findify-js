import { Component, createElement } from 'react';
import { render, createPortal } from 'react-dom';
import { createFeature } from '../features/create';
import { getParentNode } from '../helpers/getParentNode';
import { debounce } from 'lodash';
import { Events } from './events';

const createRoot = () => {
  const div = document.createElement('div');
  div.id = 'findify-root';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}

class Portal extends Component<any>{
  element: HTMLElement;
  component: any;
  parent: any;

  static displayName = 'Container'
  state = { component: null }

  constructor(props) {
    super(props);
    const { widget } = props;

    this.element = document.createElement('div');
    this.element.className = `findify-container ${widget.config.get('cssSelector')}`;
    this.parent = getParentNode(widget);
    this.component = createFeature(widget)
  }

  componentDidMount() {
    const { widget } = this.props;
    const renderTo = widget.config.get('renderTo');
    this.parent.appendChild(this.element);
  }

  componentWillUnmount() {
    this.parent.removeChild(this.element);
  }

  render() {
    return createPortal(this.component, this.element)
  }
}

class RootElement extends Component{
  state = { widgets: [] }

  static displayName = 'Findify'

  constructor(props){
    super(props);
    this.state = { widgets: props.widgets.list() };
    __root.listen((event, widget) => {
      if (event === Events.attach) {
        this.setState(({ widgets }: any) =>
          ({ widgets: [...widgets, widget] })
        )
      }
      if (event === Events.detach) {
        this.setState(({ widgets }: any) =>
          ({ widgets: widgets.filter(({ key }) => key !== widget.key) })
        )
      }
    })
  }

  render() {
    const { widgets } = this.state;
    return widgets.map((widget: any) => 
      createElement(Portal, { widget, key: widget.key })
    );
  }
}

export const renderWidgets = debounce((widgets) =>
  render(createElement(RootElement, { widgets }), createRoot())
);
