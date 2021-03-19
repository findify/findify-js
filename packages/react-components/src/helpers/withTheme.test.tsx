import { createElement } from 'react';
import { shallow } from 'enzyme';
import withTheme from './withTheme';

const ThemedMock = ({ theme }) => <div>{JSON.stringify(theme)}</div>;

describe('withTheme', () => {
  it('provides the component with default theme in case no theme is given', () => {
    expect(
      shallow(createElement(withTheme({ key: 'value' })(ThemedMock)))
    ).toMatchSnapshot();
  });

  it('merges themes, overriding values', () => {
    expect(
      shallow(
        createElement(withTheme({ key: 'value' })(ThemedMock), {
          theme: { defenestration: '|__|', key: 'value1' },
        })
      )
    ).toMatchSnapshot();
  });
});
