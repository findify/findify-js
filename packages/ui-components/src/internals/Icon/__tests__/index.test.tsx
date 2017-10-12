import * as React from 'react';
import Icon, { OwnProps } from '..';

describe('<Icon />', () => {
  it('renders correctly', () => {
    const properties: OwnProps[] = [
      { name: 'cross' },
      { name: 'arrow', width: 32, height: 40 },
      { name: 'check', width: 12, height: 20, style: { padding: 4 } },
      { name: 'cross', className: 'foo' },
      { name: 'cross', className: 'foo', style: { display: 'none' } },
    ];
    properties.forEach((props: OwnProps) => {
      const wrapper = shallow(<Icon {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });

  it('attaches and calls onClick event handler', () => {
    const onClick = jest.fn();
    const wrapper = shallow(
      <Icon name="cross" width={15} height={18} onClick={onClick} />
    );
    expect(wrapper).toMatchSnapshot();
    wrapper.simulate('click');
    wrapper.simulate('click');
    expect(onClick.mock.calls.length).toBe(2);
  });
});
