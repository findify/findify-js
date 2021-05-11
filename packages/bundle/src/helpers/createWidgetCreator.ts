export const createWidgetCreator = (widget) => {
  const preload = require(`../features/${widget.type}/preload.ts`);
  if (preload) preload.default(widget);
  return widget
}
