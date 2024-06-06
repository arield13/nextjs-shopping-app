module.exports = {
    setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
    testEnvironment: 'jsdom',
    transform: {
      '^.+\\.tsx?$': 'ts-jest', // Use ts-jest for .ts and .tsx files
    },
    moduleNameMapper: {
      '^@/(.*)$': '<rootDir>/$1', // Allow absolute imports with @/
      '\\.module\\.css$': 'identity-obj-proxy', // Mock CSS modules
    },
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  };
  