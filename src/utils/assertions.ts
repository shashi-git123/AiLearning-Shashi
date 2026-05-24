/**
 * Custom Assertion Helpers
 * Provides reusable assertions for API response validation
 */

import { Logger } from './logger';

const logger = new Logger('Assertions');

/**
 * Assert that a value equals expected value
 */
export function assertEqual<T>(actual: T, expected: T, message?: string): void {
  if (actual !== expected) {
    const msg = message || `Expected ${expected}, but got ${actual}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that a value is truthy
 */
export function assertTrue(value: any, message?: string): void {
  if (!value) {
    const msg = message || `Expected value to be truthy, but got ${value}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that a value is falsy
 */
export function assertFalse(value: any, message?: string): void {
  if (value) {
    const msg = message || `Expected value to be falsy, but got ${value}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that a value is defined (not null or undefined)
 */
export function assertDefined(value: any, message?: string): void {
  if (value === null || value === undefined) {
    const msg = message || 'Expected value to be defined';
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that a value is null or undefined
 */
export function assertUndefined(value: any, message?: string): void {
  if (value !== null && value !== undefined) {
    const msg = message || `Expected value to be undefined, but got ${value}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that an object has a property
 */
export function assertHasProperty<T extends object>(
  obj: T,
  property: keyof T | string,
  message?: string
): void {
  if (!(property in obj)) {
    const msg = message || `Expected object to have property '${String(property)}'`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that an object does not have a property
 */
export function assertNotHasProperty<T extends object>(
  obj: T,
  property: keyof T | string,
  message?: string
): void {
  if (property in obj) {
    const msg = message || `Expected object to not have property '${String(property)}'`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that a value matches a regex pattern
 */
export function assertMatches(value: string, pattern: RegExp, message?: string): void {
  if (!pattern.test(value)) {
    const msg = message || `Expected '${value}' to match pattern ${pattern}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert HTTP status code
 */
export function assertStatusCode(actualStatus: number, expectedStatus: number, message?: string): void {
  if (actualStatus !== expectedStatus) {
    const msg = message || `Expected status code ${expectedStatus}, but got ${actualStatus}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that response contains expected properties
 */
export function assertResponseHasProperties<T extends object>(
  response: T,
  properties: (keyof T | string)[],
  message?: string
): void {
  for (const prop of properties) {
    assertHasProperty(response, prop, message);
  }
}

/**
 * Assert JWT token format
 */
export function assertValidJWTFormat(token: string, message?: string): void {
  const jwtPattern = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/;
  if (!jwtPattern.test(token)) {
    const msg = message || `Token '${token.substring(0, 20)}...' is not a valid JWT format`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that a value is greater than another
 */
export function assertGreaterThan(actual: number, expected: number, message?: string): void {
  if (actual <= expected) {
    const msg = message || `Expected ${actual} to be greater than ${expected}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that a value is less than another
 */
export function assertLessThan(actual: number, expected: number, message?: string): void {
  if (actual >= expected) {
    const msg = message || `Expected ${actual} to be less than ${expected}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that array contains value
 */
export function assertIncludes<T>(array: T[], value: T, message?: string): void {
  if (!array.includes(value)) {
    const msg = message || `Expected array to include ${value}`;
    logger.error(msg);
    throw new Error(msg);
  }
}

/**
 * Assert that array does not contain value
 */
export function assertNotIncludes<T>(array: T[], value: T, message?: string): void {
  if (array.includes(value)) {
    const msg = message || `Expected array to not include ${value}`;
    logger.error(msg);
    throw new Error(msg);
  }
}
