const setTZ = require('set-tz')

setTZ('America/New_York')

module.exports = {
  verbose: false,
  reporters: ['default', 'jest-junit'],
  testPathIgnorePatterns: [
    '<rootDir>/node_modules/',
    './post-build/__tests__/',
  ],
  collectCoverageFrom: ['./src/**/*.js'],
}
