import { Component, createElement } from 'react';
import { render, createPortal } from 'react-dom';
import { createFeature } from '../features/create';

const createRoot = () => {
  const div = document.createElement('div');
  div.id = 'findify-root-element';
  div.style.display = 'none';
  document.body.appendChild(div);
  return div;
}

class Portal extends Component<any>{
  element: HTMLElement;
  component: any;

  static displayName = 'Container'

  constructor(props) {
    super(props);
    const { entity } = props;
    this.element = document.createElement('div');
    this.element.className = `findify-container-element findify-${entity.type}`;
    this.component = createFeature(entity);
  }

  componentDidMount() {
    const { entity } = this.props;
    entity.node.appendChild(this.element);
  }

  componentWillUnmount() {
    const { entity } = this.props;
    entity.node.parentElement.removeChild(this.element);
  }

  render() {
    return createPortal(this.component, this.element)
  }
}

class RootElement extends Component{
  state = { entities: [] }

  static displayName = 'Findify'

  constructor(props){
    super(props);
    this.state = { entities: props.entities.list() };
    __root.emmiter.listen((event, entity) => {
      if (event === 'attachEntity') {
        this.setState(({ entities }: any) =>
          ({ entities: [...entities, entity] })
        )
      }
      if (event === 'detachEntity') {
        this.setState(({ entities }: any) =>
          ({ entities: entities.filter(({ key }) => key !== entity.key) })
        )
      }
    })
  }

  render() {
    const { entities } = this.state;
    return entities.map((entity: any) => 
      createElement(Portal, { entity, key: entity.key })
    );
  }
}

export const renderEntities = (entities) =>
  render(createElement(RootElement, { entities }), createRoot());
