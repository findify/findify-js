import { Events } from '../core/events';
import { documentReady } from './documentReady';
import { createWidgetCreator } from './createWidgetCreator'


export const renderWidgets = async (widgets) => {
  let collection = widgets.list();
  let isWaitingForRender = false;

  const mount = async () => {
    isWaitingForRender = false;
    const { renderWidgets } = await import('../core/render');
    renderWidgets(collection);
    stopListen()
  }
  
  const stopListen = __root.listen((event, widget) => {
    if (event === Events.attach) {
      collection = [...collection, createWidgetCreator(widget)];
      if (isWaitingForRender) mount()
    }
    if (event === Events.detach) {
      collection = collection.filter(w => w.key !== widget.key)
    }
  })
  
  await documentReady;
  if (!!collection.length) mount();
  isWaitingForRender = !collection.length;
};
