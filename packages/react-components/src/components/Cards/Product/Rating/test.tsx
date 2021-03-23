import { shallow } from 'enzyme';
import theme from './styles.css';
import Rating from './view';

describe('Rating', () => {
  it('renders correctly', () => {
    const cases = [
      { value: 2, count: 2 },
      { value: 0, count: 0 },
      { value: 5, count: 10 },
    ];
    cases.map(({ value, count }) =>
      expect(
        shallow(<Rating value={value} count={count} theme={theme} />)
      ).toMatchSnapshot()
    );
  });
});
