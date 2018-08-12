import React from 'react';
import { mount } from 'enzyme';
import Image from './index';

const createFetcher = function() {
  let lastSrc;
  let lastResolve;
  let lastReject;
  return {
    fetch(src) {
      if (!!lastSrc) throw new Error('Reject or resolve last fetch before running new one!');
      lastSrc = src;
      return new Promise((resolve, reject) => {
        lastResolve = resolve;
        lastReject = reject;
      })
    },
    resolve() {
      lastResolve(lastSrc);
      lastSrc = null;
    },
    reject() {
      lastReject(lastSrc);
      lastSrc = null;
    }
  }
}

const nextTick = () => new Promise((resolve, reject) => process.nextTick(resolve));


describe('<Image />', () => {
  let fetcher;
  beforeEach(() => {
    fetcher = createFetcher();
  })

  it('renders correctly for only src image', async () => {
    const fetcher = createFetcher();
    const component = mount(<Image fetchImage={fetcher.fetch} src='foo.png' />);

    expect(component.html()).toMatchSnapshot();
    fetcher.resolve();
    await nextTick();
    expect(component.html()).toMatchSnapshot();
  });


  it('renders correctly for only src image respecting aspect ratio', async () => {
    const component = mount(<Image fetchImage={fetcher.fetch} aspectRatio={.5} src='foo.png' />);
    expect(component.html()).toMatchSnapshot();
    fetcher.resolve();
    await nextTick();
    expect(component.html()).toMatchSnapshot();
  });

  it('renders correctly for src and thumbnail', async () => {
    const component = mount(<Image fetchImage={fetcher.fetch} src='foo.png' thumbnail={'baz.png'} />);
    expect(component.html()).toMatchSnapshot();
    fetcher.resolve();
    await nextTick();
    expect(component.html()).toMatchSnapshot();
    fetcher.resolve();
    await nextTick();
    expect(component.html()).toMatchSnapshot();
  });

  it('renders correctly for src and thumbnail respecting aspect ratio', async () => {
    const component = mount(<Image fetchImage={fetcher.fetch} aspectRatio={.8} src='foo.png' thumbnail={'baz.png'} />);
    expect(component.html()).toMatchSnapshot();
    fetcher.resolve();
    await nextTick();
    expect(component.html()).toMatchSnapshot();
    fetcher.resolve();
    await nextTick();
    expect(component.html()).toMatchSnapshot();
  });
});
