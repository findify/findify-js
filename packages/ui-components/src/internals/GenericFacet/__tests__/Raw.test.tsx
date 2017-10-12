import * as React from 'react';
import { Raw, Props } from '../Raw';

const Dummy = ({ text }: { text: string }) => <div>{text}</div>;

describe('<Raw />', () => {
  it('renders correctly', () => {
    const properties: Props[] = [
      { isMobile: true },
      { isMobile: false },
      { isMobile: true, children: <Dummy text="foo" /> },
      { isMobile: false, children: <Dummy text="bar" /> },
    ];
    properties.forEach((props: Props) => {
      const component = render(<Raw {...props} />);
      expect(component).toMatchSnapshot();
    });
  });
});
