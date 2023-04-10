module.exports = {
  // ...
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  globals: {
    'process.env.NODE_ENV': 'test',
  },
  testMatch: ['<rootDir>/tests/unit/**/*.spec.(js|jsx|ts|tsx)'],
  moduleFileExtensions: ['js', 'jsx', 'json', 'vue'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '^.+\\.jsx?$': 'babel-jest',
  },
  transformIgnorePatterns: ['/node_modules/'],
  // Add this line to support ECMAScript modules
  extensionsToTreatAsEsm: ['.js', '.jsx'],
};
