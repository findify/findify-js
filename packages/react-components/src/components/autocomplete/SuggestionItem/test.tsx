import { shallow } from 'enzyme';
import SuggestionItem from './view';
import theme from './styles.css';

const createAnyGetMock = (value) => ({
  get() {
    return value;
  },
});

describe('SuggestionItem', () => {
  it('renders correctly', () => {
    expect(
      shallow(
        <SuggestionItem
          theme={theme}
          key="xxx"
          item={createAnyGetMock('aisaka taiga')}
          query={createAnyGetMock('aisa')}
        />
      )
    ).toMatchSnapshot();
  });
});
