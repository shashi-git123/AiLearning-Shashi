/**
 * HTTP API Client Wrapper
 * Provides a reusable interface for making HTTP requests with logging,
 * retry logic, and error handling
 */

import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import testConfig from '@config/testConfig';
import { Logger } from '@utils/logger';
import { retry } from '@utils/retry';

/**
 * Generic request/response types
 */
export interface ApiResponse<T = any> {
  status: number;
  statusText: string;
  headers: any;
  body: T;
  duration: number;
}

export interface ApiRequest {
  method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';
  endpoint: string;
  data?: any;
  headers?: Record<string, string>;
  params?: Record<string, any>;
}

/**
 * API Client class wrapping axios with logging and retry capabilities
 */
export class ApiClient {
  private axiosInstance: AxiosInstance;
  private logger: Logger;
  private sessionToken: string | null = null;

  constructor() {
    this.logger = new Logger('ApiClient');

    // Initialize axios instance with default config
    this.axiosInstance = axios.create({
      baseURL: testConfig.api.baseUrl,
      timeout: testConfig.api.timeoutMs,
      validateStatus: () => true, // Don't throw on any status code
    });
  }

  /**
   * Set session token for authenticated requests
   */
  setSessionToken(token: string): void {
    this.sessionToken = token;
    this.logger.debug(`Session token set: ${token.substring(0, 10)}...`);
  }

  /**
   * Clear session token
   */
  clearSessionToken(): void {
    this.sessionToken = null;
    this.logger.debug('Session token cleared');
  }

  /**
   * Build request headers with authentication if available
   */
  private buildHeaders(customHeaders?: Record<string, string>): Record<string, string> {
    const headers: Record<string, string> = {
      'Content-Type': 'application/json',
      'User-Agent': 'AmazonLoginAPITest/1.0',
      ...customHeaders,
    };

    if (this.sessionToken) {
      headers['Authorization'] = `Bearer ${this.sessionToken}`;
    }

    return headers;
  }

  /**
   * Make an HTTP request with retry logic
   */
  async request<T = any>(apiRequest: ApiRequest, retryable: boolean = true): Promise<ApiResponse<T>> {
    const makeRequest = async (): Promise<ApiResponse<T>> => {
      const startTime = Date.now();

      try {
        const config: AxiosRequestConfig = {
          method: apiRequest.method,
          url: apiRequest.endpoint,
          data: apiRequest.data,
          headers: this.buildHeaders(apiRequest.headers),
          params: apiRequest.params,
        };

        // Log request
        if (testConfig.logging.enableRequestLogging) {
          this.logger.info(`${apiRequest.method} ${apiRequest.endpoint}`);
          if (apiRequest.data) {
            this.logger.debug(`Request body: ${JSON.stringify(apiRequest.data)}`);
          }
        }

        const response: AxiosResponse<T> = await this.axiosInstance(config);
        const duration = Date.now() - startTime;

        // Log response
        if (testConfig.logging.enableResponseLogging) {
          this.logger.info(`Response: ${response.status} ${response.statusText} (${duration}ms)`);
          if (response.data) {
            this.logger.debug(`Response body: ${JSON.stringify(response.data)}`);
          }
        }

        return {
          status: response.status,
          statusText: response.statusText,
          headers: response.headers,
          body: response.data,
          duration,
        };
      } catch (error: any) {
        const duration = Date.now() - startTime;
        this.logger.error(`Request failed: ${error.message} (${duration}ms)`);
        throw error;
      }
    };

    // Apply retry logic if specified
    if (retryable) {
      return retry(makeRequest, testConfig.api.retryAttempts, testConfig.api.retryDelayMs);
    }

    return makeRequest();
  }

  /**
   * POST request helper
   */
  async post<T = any>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      {
        method: 'POST',
        endpoint,
        data,
        headers,
      },
      true
    );
  }

  /**
   * GET request helper
   */
  async get<T = any>(
    endpoint: string,
    params?: Record<string, any>,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      {
        method: 'GET',
        endpoint,
        params,
        headers,
      },
      true
    );
  }

  /**
   * PUT request helper
   */
  async put<T = any>(
    endpoint: string,
    data?: any,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      {
        method: 'PUT',
        endpoint,
        data,
        headers,
      },
      true
    );
  }

  /**
   * DELETE request helper
   */
  async delete<T = any>(
    endpoint: string,
    headers?: Record<string, string>
  ): Promise<ApiResponse<T>> {
    return this.request<T>(
      {
        method: 'DELETE',
        endpoint,
        headers,
      },
      true
    );
  }
}

export default ApiClient;
