import React from 'react';
import { shallow, render } from 'enzyme';
import Image from './index';

/** FIXME: although it _does_ render it correctly, this test should be expanded to show all stages of loading an image */
describe('<Image />', () => {
  it('renders correctly', () => {
    const properties = [
      { src: 'foo.png' },
      { src: 'bar.png', className: 'qux' },
    ];
    properties.forEach((props) => {
      const component = render(<Image {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
