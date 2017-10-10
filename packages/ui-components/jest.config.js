const config = require('../../jest.config.js');

module.exports = Object.assign({}, config, {
  transform: {
    '^.+\\.tsx?$': '../../node_modules/ts-jest/preprocessor.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@findify)'],
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['../../jest/setup.js'],
  setupTestFrameworkScriptFile: '../../node_modules/jest-enzyme/lib/index.js',
  // old versions of jest set the unmocks
  unmockedModulePathPatterns: ['react', 'enzyme', 'jest-enzyme'],
  globals: Object.assign({}, config.globals, {
    'ts-jest': Object.assign({}, config.globals['ts-jest'], {
      tsConfigFile: './tsconfig.test.json',
    }),
  }),
});
