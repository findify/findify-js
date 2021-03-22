import { Events } from '../../core/events';
import { documentReady } from '../../helpers/documentReady';
import lazy from '../../helpers/renderLazyComponent';

const lazyTabs = lazy(
  () => import('@findify/react-components/src/layouts/Tabs')
);

const getNestedWidgets = (root) => {
  const children = Array.from(root.children);
  return __root.widgets
    .list()
    .filter((w) => w && w.node && w.node.parentNode === root)
    .sort(
      (prev, next) => children.indexOf(prev.node) - children.indexOf(next.node)
    );
};

const getProps = (widgets, state, updateCount) => ({
  onClick: updateCount,
  widgets: widgets.map(({ node, key }, index) => ({
    key,
    active: state.active === key,
    title: node.dataset.title,
    count: state.counter[index],
  })),
});

const createState = (_widgets, render) => {
  const widgets = [..._widgets];

  const state = {
    counter: {},
    active: widgets[0] && widgets[0].key,
  };

  const hydrate = () => {
    widgets.forEach((widget) => {
      widget.active = widget.key === state.active;
      widget.node.style.display =
        widget.key === state.active ? 'block' : 'none';
    });

    return render(lazyTabs, getProps(widgets, state, toggle));
  };

  const toggle = (key) => {
    state.active = key;
    __root.emit(Events.hydrate, key);
    hydrate();
  };

  const updateCount = (index, count) => {
    state.counter[index] = count;
    hydrate();
  };

  const getState = () => state;

  return { updateCount, toggle, getState };
};

const getCount = (data, type) =>
  type === 'recommendation' ? data.get('limit') : data.get('total');

export default (render, widget) => {
  const { node } = widget;

  const process = () => {
    const widgets = getNestedWidgets(node);
    const { updateCount } = createState(widgets, render);
    widgets.forEach(({ type, agent }, index) => {
      if (agent.response.get('meta'))
        updateCount(index, getCount(agent.response.get('meta'), type));
      agent.on('change:meta', (meta) => {
        updateCount(index, getCount(meta, type));
      });
    });
  };

  documentReady.then(process);

  const unsubscribe = __root.listen((event, prop) => {
    if (event === Events.update) return process();
    if (event !== Events.detach || prop !== widget) return;
    unsubscribe();
    render();
  });

  return null;
};
