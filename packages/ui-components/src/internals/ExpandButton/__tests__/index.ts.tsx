import * as React from 'react';
import { ExpandButton, Props } from '..';

describe('<ExpandedButton />', () => {
  it('renders correctly', () => {
    const properties: Props[] = [
      { label: 'foo', expanded: true },
      { label: 'bar', expanded: false },
    ];
    properties.forEach((props: Props) => {
      const component = render(<ExpandButton {...props} />);
      expect(component).toMatchSnapshot();
    });
  });

  it('attaches and calls onClick event handler', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <ExpandButton expanded label="foo" onClick={onClick} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate('click');
    expect(onClick.mock.calls.length).toBe(1);
  });
});
