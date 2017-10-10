module.exports = {
  transform: {
    '^.+\\.tsx?$': '<rootDir>/node_modules/ts-jest/preprocessor.js',
  },
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.(jsx?|tsx?)$',
  testPathIgnorePatterns: ['(/__tests__/support/).*$'],
  transformIgnorePatterns: ['<rootDir>/packages/.+/node_modules/(?!@findify)'],
  roots: ['<rootDir>', '<rootDir>/packages'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
  moduleNameMapper: {
    '^.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      './jest/__mocks__/fileMock.js',
    '^.+\\.(css|svg)$': 'identity-obj-proxy',
  },
  snapshotSerializers: ['enzyme-to-json/serializer'],
  globals: {
    'ts-jest': {
      skipBabel: true,
      tsConfigFile: './tsconfig.test.json',
    },
  },
  collectCoverageFrom: [
    '**/*.{ts,tsx}',
    '!**/*.d.ts',
    '!**/node_modules/**',
    '!**/bower_components/**',
    '!**/vendor/**',
    '!**/output/**',
  ],
  coverageReporters: ['json', 'lcov', 'text', 'html'],
  coverageDirectory: 'coverage',
  mapCoverage: true,
  coverageThreshold: {
    global: {
      branches: 60,
      functions: 60,
      lines: 60,
      statements: 60,
    },
    './packages/src/**/*.{ts,tsx}': {
      branches: 80,
      statements: 80,
    },
  },
};
