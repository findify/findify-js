import * as React from 'react';
import { SearchInput, Props } from '..';

describe('<SearchInput />', () => {
  it('correctly renders itself', () => {
    const component = render(<SearchInput value="foo" placeholder="bar" />);
    expect(component).toMatchSnapshot();
  });

  it('passes current value to the onChange handler', () => {
    const onChange = jest.fn();
    const wrapper = mount(
      <SearchInput value="foo" placeholder="bar" onChange={onChange} />
    );
    const value = 'changed';
    wrapper.find('input').simulate('change', { target: { value } });
    expect(onChange).toBeCalledWith(value);
  });
});
