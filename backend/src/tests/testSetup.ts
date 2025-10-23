/**
 * @summary
 * Global test environment setup
 *
 * @module tests/testSetup
 */

// Set test environment
process.env.NODE_ENV = 'test';
process.env.PORT = '3001';

// Mock console methods to reduce noise in test output
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
};
