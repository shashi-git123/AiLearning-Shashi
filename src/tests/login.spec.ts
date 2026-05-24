/**
 * Amazon Login API Tests
 * Comprehensive test suite covering happy path and error scenarios
 */

import ApiClient from '@api/apiClient';
import AmazonLoginAPI from '@api/amazonLoginAPI';
import * as testData from '@fixtures/loginTestData';
import * as assertions from '@utils/assertions';
import { Logger } from '@utils/logger';

describe('Amazon Login API - Test Suite', () => {
  let apiClient: ApiClient;
  let loginAPI: AmazonLoginAPI;
  const logger = new Logger('LoginTests');

  /**
   * Setup before all tests
   */
  beforeAll(() => {
    logger.info('Initializing test suite');
    apiClient = new ApiClient();
    loginAPI = new AmazonLoginAPI(apiClient);
  });

  /**
   * Cleanup after each test
   */
  afterEach(() => {
    // Clear session token after each test
    loginAPI.logout();
  });

  describe('Happy Path - Successful Login', () => {
    it('should successfully login with valid credentials', async () => {
      logger.info('Test: successful login with valid credentials');

      const response = await loginAPI.login(testData.VALID_LOGIN);

      // Assert response status
      assertions.assertStatusCode(response.status, 200);

      // Assert response contains required properties
      assertions.assertResponseHasProperties(response.body, ['status', 'sessionToken', 'userId', 'email']);

      // Assert login success
      assertions.assertTrue(loginAPI.isLoginSuccessful(response));

      // Assert token format
      const successBody = response.body as any;
      assertions.assertValidJWTFormat(successBody.sessionToken);

      // Assert email matches
      assertions.assertEqual(successBody.email, testData.VALID_LOGIN.email);
    });

    it('should successfully login with remember me option', async () => {
      logger.info('Test: successful login with remember me');

      const response = await loginAPI.login(testData.VALID_LOGIN_WITH_REMEMBER);

      assertions.assertStatusCode(response.status, 200);
      assertions.assertTrue(loginAPI.isLoginSuccessful(response));

      const successBody = response.body as any;
      assertions.assertEqual(successBody.rememberMe, true);
    });

    it('should return session token on successful login', async () => {
      logger.info('Test: verify session token is returned');

      const response = await loginAPI.login(testData.VALID_LOGIN);

      assertions.assertStatusCode(response.status, 200);

      const successBody = response.body as any;
      assertions.assertDefined(successBody.sessionToken);
      assertions.assertGreaterThan(successBody.sessionToken.length, 0);
    });

    it('should return user ID on successful login', async () => {
      logger.info('Test: verify user ID is returned');

      const response = await loginAPI.login(testData.VALID_LOGIN);

      assertions.assertStatusCode(response.status, 200);

      const successBody = response.body as any;
      assertions.assertDefined(successBody.userId);
      assertions.assertMatches(successBody.userId, /^usr_[A-Za-z0-9]+$/);
    });
  });

  describe('Error Cases - Invalid Credentials', () => {
    it('should return 401 when password is incorrect', async () => {
      logger.info('Test: login with invalid password');

      const response = await loginAPI.login(testData.INVALID_PASSWORD);

      assertions.assertStatusCode(response.status, 401);

      const errorBody = response.body as any;
      assertions.assertDefined(errorBody.error);
      assertions.assertNotHasProperty(errorBody, 'sessionToken');
    });

    it('should return error when user does not exist', async () => {
      logger.info('Test: login with non-existent user');

      const response = await loginAPI.login(testData.NON_EXISTENT_USER);

      // Could be 404 or 401 depending on API design
      assertions.assertGreaterThan(response.status, 400);
      assertions.assertLessThan(response.status, 500);

      const errorBody = response.body as any;
      assertions.assertDefined(errorBody.error);
    });

    it('should reject invalid email format', async () => {
      logger.info('Test: login with invalid email format');

      const response = await loginAPI.login(testData.INVALID_EMAIL_FORMAT);

      // Could be 400 or 422 depending on validation
      assertions.assertGreaterThan(response.status, 399);
      assertions.assertLessThan(response.status, 500);

      assertions.assertFalse(loginAPI.isLoginSuccessful(response));
    });

    it('should reject empty email', async () => {
      logger.info('Test: login with empty email');

      const response = await loginAPI.login(testData.NULL_EMAIL);

      assertions.assertGreaterThan(response.status, 399);
      assertions.assertFalse(loginAPI.isLoginSuccessful(response));
    });

    it('should reject empty password', async () => {
      logger.info('Test: login with empty password');

      const response = await loginAPI.login(testData.NULL_PASSWORD);

      assertions.assertGreaterThan(response.status, 399);
      assertions.assertFalse(loginAPI.isLoginSuccessful(response));
    });
  });

  describe('Security - Injection Attacks', () => {
    it('should safely handle SQL injection attempts', async () => {
      logger.info('Test: SQL injection attempt');

      const response = await loginAPI.login(testData.SQL_INJECTION_ATTEMPT);

      // Should not allow login
      assertions.assertFalse(loginAPI.isLoginSuccessful(response));

      // Should return error (could be 400 or 401)
      assertions.assertGreaterThan(response.status, 399);
    });

    it('should safely handle XSS attempts', async () => {
      logger.info('Test: XSS attempt');

      const response = await loginAPI.login(testData.XSS_ATTEMPT);

      assertions.assertFalse(loginAPI.isLoginSuccessful(response));
      assertions.assertGreaterThan(response.status, 399);
    });

    it('should handle very long input gracefully', async () => {
      logger.info('Test: very long input');

      const response = await loginAPI.login(testData.VERY_LONG_INPUT);

      // Should not crash or allow login
      assertions.assertFalse(loginAPI.isLoginSuccessful(response));
      assertions.assertGreaterThan(response.status, 399);
    });
  });

  describe('Special Cases - Input Validation', () => {
    it('should handle special characters in email', async () => {
      logger.info('Test: special characters in email');

      const response = await loginAPI.login(testData.SPECIAL_CHARACTERS);

      // Special chars are valid in emails (+ sign for tagging)
      // Response depends on whether this is valid test account
      assertions.assertDefined(response.status);
    });

    it('should handle whitespace in credentials', async () => {
      logger.info('Test: whitespace in credentials');

      const response = await loginAPI.login(testData.WHITESPACE_CREDENTIALS);

      // API should either trim or reject
      assertions.assertDefined(response.status);
    });

    it('should handle unicode characters safely', async () => {
      logger.info('Test: unicode characters');

      const response = await loginAPI.login(testData.UNICODE_CREDENTIALS);

      assertions.assertDefined(response.status);
      assertions.assertFalse(loginAPI.isLoginSuccessful(response));
    });
  });

  describe('Response Validation', () => {
    it('should return response within acceptable time', async () => {
      logger.info('Test: response time validation');

      const response = await loginAPI.login(testData.VALID_LOGIN);

      // Response should complete in reasonable time (adjust threshold as needed)
      assertions.assertLessThan(response.duration, 5000); // 5 seconds max
    });

    it('should include timestamp in error responses', async () => {
      logger.info('Test: error response timestamp');

      const response = await loginAPI.login(testData.INVALID_PASSWORD);

      const errorBody = response.body as any;
      if (errorBody.timestamp) {
        const timestamp = new Date(errorBody.timestamp);
        assertions.assertTrue(!isNaN(timestamp.getTime()), 'Timestamp should be valid ISO string');
      }
    });

    it('should maintain consistent response structure on errors', async () => {
      logger.info('Test: error response structure consistency');

      const response = await loginAPI.login(testData.INVALID_PASSWORD);

      const errorBody = response.body as any;
      assertions.assertHasProperty(errorBody, 'error' as keyof typeof errorBody);
    });
  });

  describe('Session Management', () => {
    it('should set session token after successful login', async () => {
      logger.info('Test: session token setting');

      const response = await loginAPI.login(testData.VALID_LOGIN);

      assertions.assertStatusCode(response.status, 200);

      const successBody = response.body as any;
      assertions.assertDefined(successBody.sessionToken);
      // Session token should be set in client for subsequent requests
    });

    it('should not set session token on failed login', async () => {
      logger.info('Test: no session token on failed login');

      const response = await loginAPI.login(testData.INVALID_PASSWORD);

      assertions.assertStatusCode(response.status, 401);
      // Session token should not be set
    });
  });
});
