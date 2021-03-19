import { shallow } from 'enzyme';
import MapArray from './index';
import itemMock from '../../../../jest/item.mock';

const items = [
  itemMock('Test Title', 'https://picsum.photos/100/200'),
  itemMock('Test Title 2', 'https://picsum.photos/100/200'),
];

describe('MapArray', () => {
  it('renders correctly', () => {
    expect(
      shallow(
        <MapArray
          array={items}
          factory={({ item, key }) => (
            <div key={key}>
              {item.get('title')} {item.get('image_url')}
            </div>
          )}
          keyAccessor={(item) => item.hashCode()}
        />
      )
    ).toMatchSnapshot();
  });

  it('respects limit property', () => {
    const testArray = [];
    for (let i = 0; i < 100; i += 1)
      testArray.push(itemMock('Test title 2', 'some image url'));
    expect(
      shallow(
        <MapArray
          array={testArray}
          factory={({ item, key, index }) => (
            <div key={key + '_' + index}>
              {item.get('title')} {item.get('image_url')}
            </div>
          )}
          limit={4}
          keyAccessor={(item) => item.hashCode()}
        />
      )
    ).toMatchSnapshot();
  });
});
