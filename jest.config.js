/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  clearMocks: true,
  preset: 'ts-jest',
  testEnvironment: 'node',
  setupFiles: ["<rootDir>/.jest/setEnvVars.js"],
  roots: ["<rootDir>/src/"],
};
