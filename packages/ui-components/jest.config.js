const config = require('../../jest.config.js');

module.exports = Object.assign({}, config, {
  transform: {
    '^.+\\.tsx?$': '../../node_modules/ts-jest/preprocessor.js',
  },
  transformIgnorePatterns: ['<rootDir>/node_modules/(?!@findify)'],
  roots: ['<rootDir>/src'],
  moduleDirectories: ['node_modules', 'src'],
  setupFiles: ['./jest/shims.js', './jest/setup.js'],
  globals: Object.assign({}, config.globals, {
    'ts-jest': Object.assign({}, config.globals['ts-jest'], {
      tsConfigFile: './tsconfig.test.json',
    }),
  }),
});
