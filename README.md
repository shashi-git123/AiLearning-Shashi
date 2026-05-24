# Amazon Login API Testing Framework

A production-ready REST API testing framework built with TypeScript, Jest, and Axios for testing Amazon.in's login endpoint.

## Overview

This framework implements the **Page Object Model (POM)** pattern for API testing, providing:

- ✅ Structured API client with request/response logging
- ✅ Login API page object for endpoint abstraction
- ✅ Comprehensive test fixtures and mock responses
- ✅ Custom assertion helpers for API validation
- ✅ Exponential backoff retry logic for transient failures
- ✅ Environment-based configuration management
- ✅ Happy path and error scenario coverage
- ✅ Security testing (SQL injection, XSS attempts)
- ✅ Full TypeScript strict mode support

## Project Structure

```
amazon-login-api-tests/
├── src/
│   ├── api/
│   │   ├── apiClient.ts           # HTTP client wrapper with retry logic
│   │   └── amazonLoginAPI.ts       # Login API page object
│   ├── fixtures/
│   │   ├── loginTestData.ts        # Test data for various scenarios
│   │   └── mockResponses.ts        # Mock API response examples
│   ├── utils/
│   │   ├── assertions.ts           # Custom assertion helpers
│   │   ├── logger.ts               # Structured logging utility
│   │   └── retry.ts                # Retry mechanism with backoff
│   └── tests/
│       └── login.spec.ts           # Comprehensive test cases
├── config/
│   ├── .env.example                # Environment variables template
│   └── testConfig.ts               # Configuration manager
├── dist/                           # Compiled output (after npm run build)
├── package.json                    # Dependencies and scripts
├── tsconfig.json                   # TypeScript configuration
├── jest.config.js                  # Jest test runner configuration
└── README.md                        # This file
```

## Installation

### Prerequisites

- Node.js 16+ and npm 8+
- Git

### Setup Steps

1. **Clone/Navigate to the project:**
   ```bash
   cd amazon-login-api-tests
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create environment file:**
   ```bash
   cp config/.env.example .env
   ```

4. **Update `.env` with your configuration:**
   ```env
   API_BASE_URL=https://api.amazon.in
   API_TIMEOUT_MS=10000
   API_RETRY_ATTEMPTS=3
   TEST_EMAIL=your-test-email@amazon.in
   TEST_PASSWORD=your-test-password
   ```

## Configuration

All configuration is managed through environment variables in the `.env` file:

| Variable | Description | Default |
|----------|-------------|---------|
| `API_BASE_URL` | Amazon API base URL | `https://api.amazon.in` |
| `API_TIMEOUT_MS` | Request timeout in milliseconds | `10000` |
| `API_RETRY_ATTEMPTS` | Number of retry attempts | `3` |
| `API_RETRY_DELAY_MS` | Initial retry delay in milliseconds | `1000` |
| `NODE_ENV` | Environment (test/dev/staging/prod) | `test` |
| `LOG_LEVEL` | Log level (debug/info/warn/error) | `info` |
| `TEST_EMAIL` | Test account email | `test.user@amazon.in` |
| `TEST_PASSWORD` | Test account password | `TestPassword123!` |
| `ENABLE_REQUEST_LOGGING` | Log API requests | `true` |
| `ENABLE_RESPONSE_LOGGING` | Log API responses | `true` |

## Scripts

### Development

```bash
# Build TypeScript to JavaScript
npm run build

# Run all tests
npm test

# Run tests in watch mode (re-run on file changes)
npm run test:watch

# Run tests with coverage report
npm run coverage

# Lint code
npm run lint

# Format code
npm run format

# Clean build output
npm run clean
```

## Core Components

### 1. API Client (`src/api/apiClient.ts`)

The `ApiClient` class wraps Axios and provides:

- Request/response logging
- Automatic session token management
- Configurable timeout and retry logic
- Helper methods (get, post, put, delete)

**Usage:**
```typescript
import ApiClient from '@api/apiClient';

const client = new ApiClient();
const response = await client.post('/api/auth/login', { email, password });
```

### 2. Login API Page Object (`src/api/amazonLoginAPI.ts`)

The `AmazonLoginAPI` class encapsulates login operations:

- `login(credentials)` - Authenticate with credentials
- `logout()` - Clear session
- `isLoginSuccessful(response)` - Validate success response
- `getErrorDetails(response)` - Extract error information
- `isValidTokenFormat(token)` - Validate token format

**Usage:**
```typescript
import AmazonLoginAPI from '@api/amazonLoginAPI';

const loginAPI = new AmazonLoginAPI(apiClient);
const response = await loginAPI.login({
  email: 'test@amazon.in',
  password: 'Password123'
});
```

### 3. Test Fixtures (`src/fixtures/loginTestData.ts`)

Pre-built test data for various scenarios:

- `VALID_LOGIN` - Successful login credentials
- `INVALID_PASSWORD` - Wrong password
- `NON_EXISTENT_USER` - Non-existent account
- `SQL_INJECTION_ATTEMPT` - Security testing
- `XSS_ATTEMPT` - Security testing
- And 10+ more scenarios

### 4. Assertion Helpers (`src/utils/assertions.ts`)

Custom assertions for API testing:

- `assertStatusCode(actual, expected)` - HTTP status validation
- `assertResponseHasProperties(response, props)` - Property validation
- `assertValidJWTFormat(token)` - Token format validation
- `assertEqual(actual, expected)` - Equality checks
- And 10+ more specialized assertions

### 5. Logger (`src/utils/logger.ts`)

Structured logging with context:

```typescript
const logger = new Logger('MyComponent');
logger.debug('Detailed information');
logger.info('General information');
logger.warn('Warning message');
logger.error('Error occurred', error);
```

### 6. Retry Logic (`src/utils/retry.ts`)

Exponential backoff retry mechanism:

```typescript
const result = await retry(
  () => apiClient.post('/endpoint', data),
  3,        // maxAttempts
  1000      // initialDelayMs
);
```

## Running Tests

### Run All Tests
```bash
npm test
```

### Run Specific Test Suite
```bash
npm test -- --testNamePattern="Happy Path"
```

### Run with Coverage
```bash
npm run test:coverage
```

Output will show:
- Statement coverage
- Branch coverage
- Function coverage
- Line coverage

### Watch Mode (Development)
```bash
npm run test:watch
```

## Test Suite Structure

The test suite in `src/tests/login.spec.ts` includes:

### 1. Happy Path Tests
- Successful login with valid credentials
- Login with remember me option
- Session token validation
- User ID validation

### 2. Error Cases
- Invalid password (401)
- Non-existent user (404)
- Invalid email format
- Empty credentials

### 3. Security Tests
- SQL injection attempts
- XSS injection attempts
- Buffer overflow attempts

### 4. Input Validation
- Special characters handling
- Unicode support
- Whitespace handling

### 5. Response Validation
- Response time checking
- Timestamp validation
- Response structure consistency

### 6. Session Management
- Session token setting on success
- No token on failure

## API Integration

This framework assumes the following Amazon.in API structure:

### Login Endpoint

**Endpoint:** `POST /api/auth/login`

**Request:**
```json
{
  "email": "user@amazon.in",
  "password": "password123",
  "rememberMe": false
}
```

**Success Response (200):**
```json
{
  "status": "success",
  "sessionToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "userId": "usr_123456789",
  "email": "user@amazon.in",
  "rememberMe": false
}
```

**Error Response (401/404/etc):**
```json
{
  "error": "Invalid credentials",
  "errorCode": "INVALID_CREDENTIALS",
  "message": "The email or password you entered is incorrect.",
  "timestamp": "2024-05-24T10:30:00Z"
}
```

**Note:** Adjust endpoints and response structures based on actual Amazon.in API documentation.

## Best Practices

### Writing New Tests

1. **Use Page Objects** - Create new page object classes for different API endpoints
2. **Leverage Fixtures** - Define test data centrally in fixtures files
3. **Custom Assertions** - Add assertion helpers for common validations
4. **Descriptive Names** - Use clear test names that describe what's being tested
5. **One Assertion Per Test** - Keep tests focused on single behavior

### Example Test Structure

```typescript
it('should do something specific', async () => {
  // Arrange - Setup test data
  const credentials = { email: 'test@example.com', password: 'pass' };
  
  // Act - Perform action
  const response = await loginAPI.login(credentials);
  
  // Assert - Validate results
  assertions.assertStatusCode(response.status, 200);
  assertions.assertResponseHasProperties(response.body, ['sessionToken']);
});
```

### Debugging Failed Tests

1. **Check logs** - Review console output for request/response details
2. **Enable verbose logging:**
   ```bash
   LOG_LEVEL=debug npm test
   ```
3. **Review test output:**
   ```bash
   npm test -- --verbose
   ```
4. **Run single test:**
   ```bash
   npm test -- --testNamePattern="specific test name"
   ```

## Extending the Framework

### Adding New API Endpoints

1. Create new page object in `src/api/`:
```typescript
export class AmazonProductsAPI {
  constructor(private apiClient: ApiClient) {}
  
  async getProduct(id: string) {
    return this.apiClient.get(`/api/products/${id}`);
  }
}
```

2. Add test fixtures in `src/fixtures/`
3. Create test file in `src/tests/`

### Adding Custom Assertions

1. Add function to `src/utils/assertions.ts`:
```typescript
export function assertEmailFormat(email: string): void {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    throw new Error(`Invalid email format: ${email}`);
  }
}
```

2. Use in tests:
```typescript
assertions.assertEmailFormat(response.body.email);
```

## CI/CD Integration

### GitHub Actions Example

```yaml
name: API Tests

on: [push, pull_request]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: actions/setup-node@v3
        with:
          node-version: '18'
      - run: npm install
      - run: npm run build
      - run: npm test -- --coverage
      - run: npm run lint
```

## Troubleshooting

### Common Issues

**Issue: Tests timeout**
- Increase `API_TIMEOUT_MS` in `.env`
- Check internet connection
- Verify API endpoint is accessible

**Issue: Permission denied on Linux/Mac**
- Run `chmod +x node_modules/.bin/*`
- Use `npx` prefix for scripts

**Issue: Module not found errors**
- Delete `node_modules` and `dist`
- Run `npm install` and `npm run build`

**Issue: Tests pass locally but fail in CI**
- Verify environment variables in CI
- Check network/firewall restrictions
- Ensure test credentials are configured

## Performance Optimization

### Running Tests in Parallel

Jest runs tests in parallel by default. To control parallelization:

```bash
# Run with specific number of workers
npm test -- --maxWorkers=4
```

### Test Execution Time

To identify slow tests:

```bash
npm test -- --testTimeout=30000 --verbose
```

## Contributing

1. Create feature branch: `git checkout -b feature/new-test`
2. Make changes following the structure
3. Run tests: `npm test`
4. Format code: `npm run format`
5. Lint code: `npm run lint`
6. Commit: `git commit -am 'Add new tests'`
7. Push: `git push origin feature/new-test`

## License

MIT

## Support

For issues or questions:
1. Check the README and code comments
2. Review test examples in `src/tests/login.spec.ts`
3. Check Jest and Axios documentation
4. Review TypeScript strict mode guidelines

## Version History

**v1.0.0** (2024-05-24)
- Initial release
- Login API testing framework
- Happy path and error scenario coverage
- Security testing support
- Full TypeScript implementation

---

**Happy Testing! 🚀**
