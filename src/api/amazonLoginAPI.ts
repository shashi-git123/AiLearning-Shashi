/**
 * Amazon Login API Page Object
 * Encapsulates all login-related API operations and response handling
 */

import ApiClient, { ApiResponse } from './apiClient';
import { Logger } from '@utils/logger';

/**
 * Login request payload interface
 */
export interface LoginRequest {
  email: string;
  password: string;
  rememberMe?: boolean;
}

/**
 * Successful login response interface
 */
export interface LoginSuccess {
  status: string;
  sessionToken: string;
  userId: string;
  email: string;
  rememberMe?: boolean;
}

/**
 * Error response interface
 */
export interface ErrorResponse {
  error: string;
  errorCode: string;
  message: string;
  timestamp: string;
}

/**
 * Amazon Login API Page Object
 * Provides methods to interact with Amazon.in login endpoint
 */
export class AmazonLoginAPI {
  private apiClient: ApiClient;
  private logger: Logger;
  private loginEndpoint = '/api/auth/login';

  constructor(apiClient: ApiClient) {
    this.apiClient = apiClient;
    this.logger = new Logger('AmazonLoginAPI');
  }

  /**
   * Login with provided credentials
   * @param request Login credentials
   * @returns API response with session token or error details
   */
  async login(request: LoginRequest): Promise<ApiResponse<LoginSuccess | ErrorResponse>> {
    this.logger.info(`Attempting login for email: ${request.email}`);

    const payload = {
      email: request.email,
      password: request.password,
      rememberMe: request.rememberMe || false,
    };

    try {
      const response = await this.apiClient.post<LoginSuccess | ErrorResponse>(
        this.loginEndpoint,
        payload
      );

      if (response.status === 200 && 'sessionToken' in response.body) {
        this.logger.info(`Login successful for ${request.email}`);
        // Store session token for authenticated requests
        const successBody = response.body as LoginSuccess;
        this.apiClient.setSessionToken(successBody.sessionToken);
      } else {
        this.logger.warn(`Login failed: ${response.status} - ${JSON.stringify(response.body)}`);
      }

      return response;
    } catch (error: any) {
      this.logger.error(`Login request failed: ${error.message}`);
      throw error;
    }
  }

  /**
   * Logout - Clear session token
   */
  logout(): void {
    this.logger.info('Logging out');
    this.apiClient.clearSessionToken();
  }

  /**
   * Validate login success response structure
   */
  isLoginSuccessful(response: ApiResponse<LoginSuccess | ErrorResponse>): boolean {
    return (
      response.status === 200 &&
      'sessionToken' in response.body &&
      'userId' in response.body &&
      'email' in response.body
    );
  }

  /**
   * Extract error details from failed response
   */
  getErrorDetails(response: ApiResponse<LoginSuccess | ErrorResponse>): ErrorResponse | null {
    if (response.status !== 200 && 'error' in response.body) {
      return response.body as ErrorResponse;
    }
    return null;
  }

  /**
   * Verify session token format (basic JWT-like validation)
   */
  isValidTokenFormat(token: string): boolean {
    // Check if token matches expected pattern (adjust based on actual format)
    const tokenPattern = /^[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+\.[A-Za-z0-9\-_]+$/;
    return tokenPattern.test(token) || token.length > 20; // Fallback check for non-JWT tokens
  }
}

export default AmazonLoginAPI;
