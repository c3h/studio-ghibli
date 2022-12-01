module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  moduleNameMapper: {
    mocks: '<rootDir>/mocks',
    '[$]/(.*)': '<rootDir>/src/$1',
    'tests/(.*)': '<rootDir>/tests/$1'
  }
};
