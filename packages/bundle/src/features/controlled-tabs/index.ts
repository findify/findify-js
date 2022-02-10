import { Immutable } from '@findify/store-configuration';
import { Widget } from '../../core/widgets';
import { Map } from 'immutable';
import { Events } from '../../core/events';
import { documentReady } from '../../helpers/documentReady';
import lazy from '../../helpers/renderLazyComponent';
import { hideLoader } from '../../helpers/fallbackNode';

const lazyTabs = lazy(
  () => import('@findify/react-components/src/layouts/Tabs')
);

const getProps = (widgets, state, updateCount) => ({
  onClick: updateCount,
  widgets: widgets.map(({ node, key }, index) => ({
    key,
    active: state.active === key,
    title: node.dataset?.title,
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
  

export const createWidget = (
  parentNode: HTMLElement,
  type: 'search' | 'content',
  title: string,
  config: Map<string, unknown>
): Widget<Immutable.FeatureConfig> => {
  const node = document.createElement('div')
  node.setAttribute('data-title', title)
  if (type === 'content') {
    node.setAttribute('data-type', config.get('source') as string)
  }
  parentNode.appendChild(node)
  window.findify.widgets.attach(node, type, config)
  return window.findify.widgets.get(config.get('widgetKey'))
}

export default (render, widget) => {
  const { node, config } = widget;

  const process = () => {
    const widgets: Widget<Immutable.FeatureConfig>[] = [];
    const searchWidget = createWidget(node, 'search', config.getIn(['translations', 'search.title']), Map({ widgetKey: 'search-results' }));
    searchWidget.agent.on('change:items', () => {
      hideLoader(node)
    });
    if (searchWidget.agent.response.get('items')?.size) {
      hideLoader(node)
    }
    widgets.push(searchWidget)
    if (config.getIn(['features', 'content'])?.size > 0) {
      config.getIn(['features', 'content']).forEach((ciConfig, source) => {
        widgets.push(createWidget(
          node,
          'content',
          config.getIn(['features', 'content', source, 'title']),
          config
            .set('source', source)
            .set('widgetKey', `content-${source}`)
        ))
      })
      const { updateCount } = createState(widgets, render);
      widgets.forEach(({ type, agent }, index) => {
        if (agent.response.get('meta'))
          updateCount(index, getCount(agent.response.get('meta'), type));
        agent.on('change:meta', (meta) => {
          updateCount(index, getCount(meta, type));
        });
      });
    }
  };

  documentReady.then(process);

  const unsubscribe = __root.listen((event, prop) => {
    if (event !== Events.detach || prop !== widget) return;
    unsubscribe();
    render();
  });

  return null;
};