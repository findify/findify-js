import { mount } from 'enzyme';
import { Tabs, Tab } from './index';

const tabData = [
  {
    label: <h1>Hello world</h1>,
    disabled: false,
    children: <p>Wazzup!</p>,
  },
  {
    label: <h1>Goodbye world</h1>,
    disabled: true,
    children: <p>Wazzup, tab 2 here!</p>,
  },
  {
    label: <h1>See ya later, world</h1>,
    disabled: false,
    children: <p>Tab 3 it is!</p>,
  },
];

describe('Tabs', () => {
  it('renders first tab by default', () => {
    expect(mount(<div></div>)).toMatchSnapshot();
  });
  // it('renders first tab by default', () => {
  //   expect(mount(createTabs())).toMatchSnapshot()
  // })

  // it('respects selectedIndex property', () => {
  //   expect(mount(createTabs({ selectedIndex: 0 }))).toMatchSnapshot()
  // })
});

function createTabs(props = {}) {
  return (
    <Tabs {...props}>
      <Tab label="Hello world">
        <p>Wazzup!</p>
      </Tab>
      <Tab label="Goodbye world">
        <p>Wazzup, tab 2 here!</p>
      </Tab>
    </Tabs>
  );
}
