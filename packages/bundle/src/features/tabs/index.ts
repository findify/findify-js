import { Events } from '../../core/events';
import Tabs from '@findify/react-components/src/layouts/Tabs';

const getNestedWidgets = root => {
  const children = Array.from(root.children);
  return __root.widgets.list()
    .filter(({ node }) => node.parentNode === root)
    .sort((prev, next) => children.indexOf(prev.node) - children.indexOf(next.node));
}

const getProps = (widgets, state, updateCount) => ({
  onClick: updateCount,
  widgets: widgets.map(({ node, key }, index) => ({
    key,
    active: state.active === key,
    title: node.dataset.title,
    count: state.counter[index]
  }))
});

const createState = (_widgets, render) => {
  const widgets = [..._widgets];
  const state = {
    counter: {},
    active: widgets[0] && widgets[0].key
  }

  const hydrate = () => {
    widgets.forEach(widget => {
      widget.active = widget.key === state.active;
      widget.node.style.display = widget.key ===  state.active ? 'block' : 'none';
    });
    render(Tabs, getProps(widgets, state, toggle))
  }

  const toggle = (key) => {
    state.active = key;
    __root.emit(Events.hydrate, key);
    hydrate()
  };

  const updateCount = (index, count) => {
    state.counter[index] = count;
    hydrate();
  };

  const getState = () => state;

  return { updateCount, toggle, getState }
}


export default (widget, render) => {
  const { node } = widget;
  const widgets = getNestedWidgets(node);
  const { updateCount, getState } = createState(widgets, render);
  

  widgets.forEach(({ type, agent }, index) => agent.on('change:meta', (meta) => {
    updateCount(index, type === 'recommendation' ? meta.get('limit') : meta.get('total'));
  }));

  const unsubscribe = __root.listen((event, prop) => {
    if (event !== Events.detach || prop !== widget) return;
    unsubscribe();
    render();
  });

  return null;
}
