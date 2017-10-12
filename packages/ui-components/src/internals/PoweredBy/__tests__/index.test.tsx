import * as React from 'react';
import { PoweredBy, Props } from '..';

describe('<PoweredBy />', () => {
  it('renders correctly', () => {
    const component = render(<PoweredBy />);
    expect(component).toMatchSnapshot();
  });

  it('attaches and calls onClick event handler', () => {
    const onClick = jest.fn();
    const wrapper = shallow(<PoweredBy onClick={onClick} />);
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
