const Enzyme = require('enzyme');
const Adapter = require('enzyme-adapter-react-16');

// React 16 Enzyme adapter
Enzyme.configure({ adapter: new Adapter() });

// make Enzyme functions available in all test files without importing
global.shallow = Enzyme.shallow;
global.render = Enzyme.render;
global.mount = Enzyme.mount;
