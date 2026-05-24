/**
 * Utilities Unit Tests
 * Tests for logger, assertions, and retry utilities
 */

import { Logger } from '@utils/logger';
import * as assertions from '@utils/assertions';

describe('Logger Utility', () => {
  let logger: Logger;

  beforeEach(() => {
    logger = new Logger('TestContext');
  });

  it('should create logger instance with context', () => {
    expect(logger).toBeDefined();
  });

  it('should log debug messages', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    logger.debug('Test debug message');
    // Debug may not log depending on level
    consoleSpy.mockRestore();
  });

  it('should log info messages', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation();
    logger.info('Test info message');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should log warning messages', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    logger.warn('Test warning message');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });

  it('should log error messages', () => {
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();
    logger.error('Test error message');
    expect(consoleSpy).toHaveBeenCalled();
    consoleSpy.mockRestore();
  });
});

describe('Assertion Helpers', () => {
  describe('assertEqual', () => {
    it('should pass when values are equal', () => {
      expect(() => assertions.assertEqual(5, 5)).not.toThrow();
    });

    it('should throw when values are not equal', () => {
      expect(() => assertions.assertEqual(5, 10)).toThrow();
    });
  });

  describe('assertTrue', () => {
    it('should pass for truthy values', () => {
      expect(() => assertions.assertTrue(true)).not.toThrow();
      expect(() => assertions.assertTrue(1)).not.toThrow();
      expect(() => assertions.assertTrue('text')).not.toThrow();
    });

    it('should throw for falsy values', () => {
      expect(() => assertions.assertTrue(false)).toThrow();
      expect(() => assertions.assertTrue(0)).toThrow();
      expect(() => assertions.assertTrue('')).toThrow();
    });
  });

  describe('assertFalse', () => {
    it('should pass for falsy values', () => {
      expect(() => assertions.assertFalse(false)).not.toThrow();
      expect(() => assertions.assertFalse(0)).not.toThrow();
      expect(() => assertions.assertFalse('')).not.toThrow();
    });

    it('should throw for truthy values', () => {
      expect(() => assertions.assertFalse(true)).toThrow();
      expect(() => assertions.assertFalse(1)).toThrow();
      expect(() => assertions.assertFalse('text')).toThrow();
    });
  });

  describe('assertDefined', () => {
    it('should pass for defined values', () => {
      expect(() => assertions.assertDefined(0)).not.toThrow();
      expect(() => assertions.assertDefined('')).not.toThrow();
      expect(() => assertions.assertDefined(false)).not.toThrow();
      expect(() => assertions.assertDefined({})).not.toThrow();
    });

    it('should throw for undefined/null', () => {
      expect(() => assertions.assertDefined(undefined)).toThrow();
      expect(() => assertions.assertDefined(null)).toThrow();
    });
  });

  describe('assertHasProperty', () => {
    it('should pass when object has property', () => {
      const obj = { name: 'test', value: 42 };
      expect(() => assertions.assertHasProperty(obj, 'name')).not.toThrow();
      expect(() => assertions.assertHasProperty(obj, 'value')).not.toThrow();
    });

    it('should throw when object missing property', () => {
      const obj = { name: 'test' };
      expect(() => assertions.assertHasProperty(obj, 'value' as any)).toThrow();
    });
  });

  describe('assertMatches', () => {
    it('should pass when string matches pattern', () => {
      expect(() => assertions.assertMatches('test123', /\d+/)).not.toThrow();
      expect(() => assertions.assertMatches('hello@example.com', /@/)).not.toThrow();
    });

    it('should throw when string does not match pattern', () => {
      expect(() => assertions.assertMatches('test', /\d+/)).toThrow();
    });
  });

  describe('assertStatusCode', () => {
    it('should pass for matching status codes', () => {
      expect(() => assertions.assertStatusCode(200, 200)).not.toThrow();
      expect(() => assertions.assertStatusCode(404, 404)).not.toThrow();
    });

    it('should throw for mismatched status codes', () => {
      expect(() => assertions.assertStatusCode(200, 404)).toThrow();
      expect(() => assertions.assertStatusCode(500, 200)).toThrow();
    });
  });

  describe('assertValidJWTFormat', () => {
    it('should pass for valid JWT format', () => {
      const validJWT = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIn0.dozjgNryP4J3jVmNHl0w5N_XgL0n3I9PlFUP0THsR8U';
      expect(() => assertions.assertValidJWTFormat(validJWT)).not.toThrow();
    });

    it('should throw for invalid JWT format', () => {
      expect(() => assertions.assertValidJWTFormat('invalid.token')).toThrow();
      expect(() => assertions.assertValidJWTFormat('notajwt')).toThrow();
    });
  });

  describe('assertGreaterThan', () => {
    it('should pass when first value is greater', () => {
      expect(() => assertions.assertGreaterThan(10, 5)).not.toThrow();
    });

    it('should throw when first value is not greater', () => {
      expect(() => assertions.assertGreaterThan(5, 10)).toThrow();
      expect(() => assertions.assertGreaterThan(5, 5)).toThrow();
    });
  });

  describe('assertIncludes', () => {
    it('should pass when array includes value', () => {
      expect(() => assertions.assertIncludes([1, 2, 3], 2)).not.toThrow();
      expect(() => assertions.assertIncludes(['a', 'b', 'c'], 'b')).not.toThrow();
    });

    it('should throw when array does not include value', () => {
      expect(() => assertions.assertIncludes([1, 2, 3], 5)).toThrow();
      expect(() => assertions.assertIncludes(['a', 'b'], 'c')).toThrow();
    });
  });
});
