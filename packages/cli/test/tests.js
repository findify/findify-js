const { createTest, describe } = require('./helpers');

const search = createTest(async (merchant, findify, dom) => {
  const { window } = dom;
  const div = window.document.createElement('div');
  window.document.body.appendChild(div);
  findify.utils.history.push(findify.config.getIn(['location', 'searchUrl']));
  findify.widgets.attach(div, 'search', { widgetKey: 'test' });

  const agent = findify.widgets.get('test').agent.set('q', '');
  const items = await new Promise(resolve => agent.on('change:items', items => resolve(items)));

  await new Promise(resolve => window.requestAnimationFrame(resolve));

  return describe(
    [
      'Same amount of items',
      items.size === div.querySelectorAll('.findify-components--cards--product').length
    ]
  )
})

const autocomplete = createTest(async (merchant, findify, dom) => {
  return describe(
    [
      'Same amount of suggestions',
      false
    ]
  )
})

module.exports = (...args) => (feature) => ({
  search,
  autocomplete
}[feature](feature, ...args));