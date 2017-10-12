import * as React from 'react';
import { shallow, render } from 'enzyme';
import Image, { Props } from '..';

describe('<Image />', () => {
  // TODO: fix messed up context binding in Image.onload in lifecyle HOC
  it.skip('renders correctly', () => {
    const properties: Props[] = [
      { src: 'foo.png' },
      { src: 'bar.png', className: 'qux' },
    ];
    properties.forEach((props: Props) => {
      const component = render(<Image {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
