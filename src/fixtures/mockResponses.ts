/**
 * Mock API Responses
 * Reference responses for different login scenarios
 */

import { LoginSuccess, ErrorResponse } from '@api/amazonLoginAPI';

/**
 * Successful login response
 */
export const mockSuccessResponse: LoginSuccess = {
  status: 'success',
  sessionToken: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c',
  userId: 'usr_123456789',
  email: 'test.user@amazon.in',
  rememberMe: false,
};

/**
 * Invalid credentials error response (401)
 */
export const mockInvalidCredentialsResponse: ErrorResponse = {
  error: 'Invalid credentials',
  errorCode: 'INVALID_CREDENTIALS',
  message: 'The email or password you entered is incorrect. Please try again.',
  timestamp: new Date().toISOString(),
};

/**
 * User not found error response (404)
 */
export const mockUserNotFoundResponse: ErrorResponse = {
  error: 'User not found',
  errorCode: 'USER_NOT_FOUND',
  message: 'No account found with this email address. Please check and try again or create a new account.',
  timestamp: new Date().toISOString(),
};

/**
 * Too many login attempts error response (429)
 */
export const mockRateLimitResponse: ErrorResponse = {
  error: 'Too many login attempts',
  errorCode: 'RATE_LIMIT_EXCEEDED',
  message: 'Your account has been temporarily locked due to multiple failed login attempts. Please try again later.',
  timestamp: new Date().toISOString(),
};

/**
 * Account locked error response
 */
export const mockAccountLockedResponse: ErrorResponse = {
  error: 'Account locked',
  errorCode: 'ACCOUNT_LOCKED',
  message: 'Your account has been locked for security reasons. Please contact support or reset your password.',
  timestamp: new Date().toISOString(),
};

/**
 * Server error response (500)
 */
export const mockServerErrorResponse: ErrorResponse = {
  error: 'Internal server error',
  errorCode: 'INTERNAL_SERVER_ERROR',
  message: 'An unexpected error occurred. Please try again later.',
  timestamp: new Date().toISOString(),
};

/**
 * Bad request error response (400)
 */
export const mockBadRequestResponse: ErrorResponse = {
  error: 'Bad request',
  errorCode: 'BAD_REQUEST',
  message: 'The request was invalid or malformed. Please check the required fields.',
  timestamp: new Date().toISOString(),
};

/**
 * Validation error response (422)
 */
export const mockValidationErrorResponse: ErrorResponse = {
  error: 'Validation failed',
  errorCode: 'VALIDATION_ERROR',
  message: 'Email format is invalid. Please enter a valid email address.',
  timestamp: new Date().toISOString(),
};

/**
 * Two-factor authentication required response
 */
export const mock2FARequiredResponse = {
  status: 'mfa_required',
  sessionToken: 'temp_token_123',
  userId: 'usr_123456789',
  email: 'test.user@amazon.in',
  mfaRequired: true,
  mfaChannel: 'email',
};

/**
 * Network timeout scenario (no response)
 */
export const mockNetworkTimeoutError = {
  error: 'Network timeout',
  errorCode: 'NETWORK_TIMEOUT',
  message: 'The request timed out. Please check your internet connection and try again.',
  timestamp: new Date().toISOString(),
};

/**
 * SSL certificate error
 */
export const mockSSLErrorResponse = {
  error: 'SSL certificate error',
  errorCode: 'SSL_ERROR',
  message: 'Unable to verify the SSL certificate. Please try again later.',
  timestamp: new Date().toISOString(),
};
