import * as React from 'react';
import { shallow, render } from 'enzyme';
import Image, { Props } from '..';

describe('<Image />', () => {
  it('renders correctly', () => {
    const properties: Props[] = [
      { src: 'foo.png' },
      { src: 'bar.png', className: 'qux' },
    ];
    properties.forEach((props: Props) => {
      const component = render(<Image {...props} />);
      expect(component).toMatchSnapshot();
    });
  });

  it('removes "loading" class when loading is done', () => {
    // TODO
    const wrapper = shallow(<Image src="quux.jpg" />);
    // expect(wrapper.hasClass('loading')).toBe(true);
    wrapper.simulate('load');
    // expect(wrapper.hasClass('loading')).toBe(false);
  });
});
