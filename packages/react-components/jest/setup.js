const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

const { shallow, render, mount } = Enzyme;

Enzyme.configure({ adapter: new Adapter() });

global.shallow = shallow;
global.render = render;
global.mount = mount;
