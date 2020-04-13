const { createTest } = require('./helpers');

const search = createTest(describe => async (merchant, findify, dom) => {
  const { window } = dom;
  const div = window.document.createElement('div');
  window.document.body.appendChild(div);
  window.innerWidth = 1400;

  findify.utils.history.push(findify.config.getIn(['location', 'searchUrl']));
  findify.widgets.attach(div, 'search', { widgetKey: 'test' });

  const agent = findify.widgets.get('test').agent.set('q', '');

  const items = await new Promise(resolve => agent.on('change:items', items => resolve(items)));

  await new Promise(resolve => window.requestAnimationFrame(resolve));

  describe(
    'Same amount of rendered items',
    items.size === div.querySelectorAll('.findify-components--cards--product').length
  )

  describe(
    'Same amount of rendered facets', () =>
    agent.response.get('facets').size === div.querySelectorAll('.findify-components-search--desktop-facets__facet').length
  )
})

const autocomplete = createTest(describe => async (merchant, findify, dom) => {
  const { window } = dom;
  const input = window.document.createElement('input');
  window.innerWidth = 1400;
  window.document.body.appendChild(input);
  findify.widgets.attach(input, 'autocomplete', { widgetKey: 'test' });
  const agent = findify.widgets.get('test').agent;
  
  input.value = 'a';

  input.dispatchEvent(new window.Event('input'));

  const [suggestions, meta] = await new Promise(resolve => agent.on('change:suggestions', (...args) => resolve(args)));

  await new Promise(resolve => window.requestAnimationFrame(resolve));

  input.dispatchEvent(new window.Event('focus'));

  const els = window.document.querySelectorAll('.findify-components-autocomplete--suggestion-item__suggestion');

  describe(
    'Have suggestions',
    !!els.length
  )

  if (!els.length) return;

  describe(
    'Same amount of rendered suggestions',
    suggestions.size === els.length
  );
})


const recommendation = createTest(describe => async (merchant, findify, dom) => {
  const { window } = dom;
  const div = window.document.createElement('div');
  window.innerWidth = 1400;
  window.document.body.appendChild(div);

  const config = findify.config.getIn(['features', 'recommendations']);
  const _rec = config && config.find(i => i.get('type') === "trending" && i.get('enabled'));

  if (!_rec) return;

  findify.widgets.attach(div, 'recommendation', { ..._rec.toJS(), widgetKey: 'test' });

  const agent = findify.widgets.get('test').agent;

  const [items] = await new Promise(resolve => agent.on('change:items', (...args) => resolve(args)));

  await new Promise(resolve => window.requestAnimationFrame(resolve));

  describe(
    'Have rendered items',
    !!div.querySelectorAll('.findify-components--cards--product').length
  )

})

module.exports = (...args) => (feature) => ({
  search,
  autocomplete,
  recommendation
}[feature](feature, ...args));
