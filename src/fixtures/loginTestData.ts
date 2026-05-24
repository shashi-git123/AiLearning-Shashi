/**
 * Login Test Data Fixtures
 * Centralized test data for login scenarios
 */

import testConfig from '@config/testConfig';
import { LoginRequest } from '@api/amazonLoginAPI';

/**
 * Valid login credentials
 */
export const VALID_LOGIN: LoginRequest = {
  email: testConfig.credentials.testEmail,
  password: testConfig.credentials.testPassword,
  rememberMe: false,
};

/**
 * Valid login with remember me
 */
export const VALID_LOGIN_WITH_REMEMBER: LoginRequest = {
  email: testConfig.credentials.testEmail,
  password: testConfig.credentials.testPassword,
  rememberMe: true,
};

/**
 * Invalid password - happy path exists but password is wrong
 */
export const INVALID_PASSWORD: LoginRequest = {
  email: testConfig.credentials.testEmail,
  password: testConfig.credentials.invalidPassword,
  rememberMe: false,
};

/**
 * Non-existent user
 */
export const NON_EXISTENT_USER: LoginRequest = {
  email: testConfig.credentials.invalidEmail,
  password: testConfig.credentials.testPassword,
  rememberMe: false,
};

/**
 * Invalid email format
 */
export const INVALID_EMAIL_FORMAT: LoginRequest = {
  email: 'not-an-email',
  password: testConfig.credentials.testPassword,
  rememberMe: false,
};

/**
 * Empty credentials
 */
export const EMPTY_CREDENTIALS: LoginRequest = {
  email: '',
  password: '',
  rememberMe: false,
};

/**
 * Null/undefined credentials (will be sent as null in JSON)
 */
export const NULL_EMAIL: LoginRequest = {
  email: '',
  password: testConfig.credentials.testPassword,
  rememberMe: false,
};

export const NULL_PASSWORD: LoginRequest = {
  email: testConfig.credentials.testEmail,
  password: '',
  rememberMe: false,
};

/**
 * SQL injection attempt
 */
export const SQL_INJECTION_ATTEMPT: LoginRequest = {
  email: "admin' OR '1'='1",
  password: "admin' OR '1'='1",
  rememberMe: false,
};

/**
 * XSS attempt
 */
export const XSS_ATTEMPT: LoginRequest = {
  email: '<script>alert("xss")</script>@amazon.in',
  password: '<img src=x onerror="alert(1)">',
  rememberMe: false,
};

/**
 * Very long input (potential buffer overflow)
 */
export const VERY_LONG_INPUT: LoginRequest = {
  email: 'a'.repeat(1000) + '@amazon.in',
  password: 'b'.repeat(1000),
  rememberMe: false,
};

/**
 * Special characters in credentials
 */
export const SPECIAL_CHARACTERS: LoginRequest = {
  email: 'test+tag@amazon.in',
  password: 'P@ssw0rd!#$%',
  rememberMe: false,
};

/**
 * Unicode characters
 */
export const UNICODE_CREDENTIALS: LoginRequest = {
  email: 'tëst@amazon.in',
  password: 'पासवर्ड123',
  rememberMe: false,
};

/**
 * Whitespace in credentials
 */
export const WHITESPACE_CREDENTIALS: LoginRequest = {
  email: '  ' + testConfig.credentials.testEmail + '  ',
  password: '  ' + testConfig.credentials.testPassword + '  ',
  rememberMe: false,
};

/**
 * Common weak passwords
 */
export const WEAK_PASSWORD: LoginRequest = {
  email: testConfig.credentials.testEmail,
  password: '123456',
  rememberMe: false,
};

/**
 * All test data for easy iteration
 */
export const loginTestCases = {
  valid: VALID_LOGIN,
  validWithRemember: VALID_LOGIN_WITH_REMEMBER,
  invalidPassword: INVALID_PASSWORD,
  nonExistentUser: NON_EXISTENT_USER,
  invalidEmailFormat: INVALID_EMAIL_FORMAT,
  emptyCredentials: EMPTY_CREDENTIALS,
  nullEmail: NULL_EMAIL,
  nullPassword: NULL_PASSWORD,
  sqlInjection: SQL_INJECTION_ATTEMPT,
  xssAttempt: XSS_ATTEMPT,
  veryLongInput: VERY_LONG_INPUT,
  specialCharacters: SPECIAL_CHARACTERS,
  unicodeCredentials: UNICODE_CREDENTIALS,
  whitespaceCredentials: WHITESPACE_CREDENTIALS,
  weakPassword: WEAK_PASSWORD,
};
