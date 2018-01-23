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
  const agent = new Agent(config);
  it('Should merge state', () => {
    agent.set('q', 'query');
    agent.set('filters', { filter: ['2'] });
    agent.cache.invalidate();
    expect(agent.state).toEqual({ q: 'query', filters: { filter: ['2'] } });
  });
});
