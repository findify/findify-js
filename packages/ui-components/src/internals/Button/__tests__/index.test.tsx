import * as React from 'react';
import { shallow, render } from 'enzyme';
import Button, { Props } from '..';

describe('<Button />', () => {
  it('renders correctly', () => {
    const properties: Props[] = [
      {},
      { className: 'foo' },
      {
        className: 'bar',
        children: <div>children div</div>,
      },
    ];
    properties.forEach((props: Props) => {
      const component = render(<Button {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
