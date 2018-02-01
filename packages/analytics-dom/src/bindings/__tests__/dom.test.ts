import { startDOMListeners } from '../dom';

let state = [];
const listener = (...args) => { state = args; };

afterAll(() => {
  state = [];
  document.removeEventListener('click', listener);
})

describe('DOM events', () => {
  document.body.innerHTML = `
    <button id='suggestion' data-findify-track='click-item' data-findify-id='1' data-findify-rid='2' />
  `
  it('Should handle click on element with data-* attrs', done => {
    startDOMListeners(listener, document)
    document.getElementById('suggestion').click();
    expect(state[0]).toBe('click-item');
    expect(state[1]).toEqual({ id: '1', rid: '2' });
    done();
  })
})
