import { Agent } from '../Agent';
const config = {
  url: 'https://api-v3.findify.io',
  key: '2e963f3e-38bd-4c00-9636-c00e48945eb7',
  method: 'post',
  timeout: 5000,
  jsonpCallback: 'findifyCallback',
  retryCount: 1,
  user: {
    uid: 'test1',
    sid: 'ssid1',
  },
};

describe('Agent', () => {
  it('Should merge state', () => {
    const agent = new Agent(config);
    agent.set('q', 'query');
    agent.set('filters', { filter: ['2'] });
    agent.cache.invalidate();
    expect(agent.state.toJS()).toEqual({ q: 'query', filters: { filter: ['2'] } });
  });

  it('Should apply defaults ', () => {
    const agent = new Agent(config);
    agent.defaults({ filters: { filter: ['2'] }});
    agent.cache.invalidate();
    expect(agent._defaults.toJS()).toEqual({ filters: { filter: ['2'] } });
  })

  it('Should overwrite and merge defaults', () => {
    const agent = new Agent(config);
    agent.defaults({ q: 'one', filters: { filter: ['2'] }});
    agent.set('filters', { filter: ['1'] });
    agent.cache.invalidate();
    expect(agent.state.toJS()).toEqual({ filters: { filter: ['1'] } });
  })

  it('Should reset state', () => {
    const agent = new Agent(config);
    agent.defaults({ q: 'one', filters: { filter: ['2'] }});
    agent.set('filters', { filter: ['1'] });
    agent.reset();
    agent.cache.invalidate();
    expect(agent.state.toJS()).toEqual({});
  })
});
