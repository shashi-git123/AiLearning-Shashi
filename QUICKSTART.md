# Amazon Login API Testing Framework - Quick Start Guide

## ✅ Framework Setup Complete!

Your production-ready REST API testing framework for Amazon.in login endpoint has been successfully created in:
```
c:\Users\RA\Documents\AiLearningDemoRepo\amazon-login-api-tests
```

## 📦 What's Installed

### Dependencies
- **axios** - HTTP client for API requests
- **jest** - Test runner and framework
- **ts-jest** - TypeScript support for Jest
- **TypeScript** - Strict type checking
- **ESLint & Prettier** - Code quality and formatting

### Project Structure
```
src/
├── api/
│   ├── apiClient.ts           # HTTP wrapper with retry logic
│   └── amazonLoginAPI.ts       # Login API page object
├── fixtures/
│   ├── loginTestData.ts        # Test data for all scenarios
│   └── mockResponses.ts        # Mock API responses
├── utils/
│   ├── assertions.ts           # Custom assertion helpers
│   ├── logger.ts               # Structured logging
│   └── retry.ts                # Exponential backoff retry
└── tests/
    └── login.spec.ts           # 25+ comprehensive test cases

config/
├── .env                        # Configuration (created)
├── .env.example                # Configuration template
└── testConfig.ts               # Config manager

dist/                           # Compiled JavaScript (ready to run)
```

## 🚀 Next Steps

### 1. Update Test Credentials
Edit `.env` file with actual Amazon.in test credentials:
```
TEST_EMAIL=your-email@amazon.in
TEST_PASSWORD=your-password
```

### 2. Run Tests
```bash
# Navigate to project
cd c:\Users\RA\Documents\AiLearningDemoRepo\amazon-login-api-tests

# Run all tests
npm test

# Run with watch mode (auto-rerun on changes)
npm run test:watch

# Run with coverage report
npm run test:coverage

# Run specific test suite
npm test -- --testNamePattern="Happy Path"
```

### 3. Build Project (if needed)
```bash
npm run build
```

### 4. Code Quality
```bash
npm run lint        # Check code style
npm run format      # Auto-format code
```

## 📋 Test Coverage

The framework includes **25+ test cases** covering:

✅ **Happy Path** (4 tests)
- Successful login with valid credentials
- Login with remember me option
- Session token validation
- User ID validation

✅ **Error Cases** (5 tests)
- Invalid password (401)
- Non-existent user (404)
- Invalid email format
- Empty credentials

✅ **Security Tests** (3 tests)
- SQL injection attempts
- XSS injection attempts
- Buffer overflow attempts

✅ **Input Validation** (3 tests)
- Special characters handling
- Unicode support
- Whitespace handling

✅ **Response Validation** (3 tests)
- Response time checking
- Timestamp validation
- Response structure consistency

✅ **Session Management** (2 tests)
- Session token setting on success
- No token on failed login

## 🔑 Key Features

### Page Object Model (POM)
- Encapsulated API operations in `AmazonLoginAPI` class
- Clean separation of concerns
- Easy to extend with new endpoints

### Retry Logic
- Exponential backoff for transient failures
- Configurable retry attempts and delays
- Smart handling of client errors (no retry on 4xx)

### Comprehensive Assertions
- 15+ custom assertion helpers
- JWT token format validation
- HTTP status code validation
- Response property validation

### Environment Configuration
- Dev, staging, prod support
- Easy credential management
- Configurable timeouts and retry behavior

### Structured Logging
- Request/response logging
- Timestamp and context tracking
- Configurable log levels

## 📝 Core Exports

### API Client
```typescript
import ApiClient from '@api/apiClient';
const client = new ApiClient();
await client.post('/endpoint', data);
```

### Login API
```typescript
import AmazonLoginAPI from '@api/amazonLoginAPI';
const loginAPI = new AmazonLoginAPI(client);
await loginAPI.login({ email, password });
```

### Test Data
```typescript
import * as testData from '@fixtures/loginTestData';
const credentials = testData.VALID_LOGIN;
```

### Assertions
```typescript
import * as assertions from '@utils/assertions';
assertions.assertStatusCode(response.status, 200);
assertions.assertValidJWTFormat(token);
```

## ⚙️ Configuration Reference

| Setting | Purpose | Default |
|---------|---------|---------|
| API_BASE_URL | Amazon API endpoint | https://api.amazon.in |
| API_TIMEOUT_MS | Request timeout | 10000 ms |
| API_RETRY_ATTEMPTS | Retry count | 3 |
| LOG_LEVEL | Logging verbosity | info |
| ENABLE_REQUEST_LOGGING | Log requests | true |
| ENABLE_RESPONSE_LOGGING | Log responses | true |

## 📚 Documentation

Full documentation available in:
- **README.md** - Complete framework guide
- **Code comments** - Inline JSDoc documentation
- **Test examples** - See src/tests/login.spec.ts

## 🛠️ Extending the Framework

### Add New API Endpoint
1. Create new page object in `src/api/`
2. Extend `ApiClient` or reuse
3. Add test fixtures in `src/fixtures/`
4. Create tests in `src/tests/`

### Add Custom Assertion
Edit `src/utils/assertions.ts`:
```typescript
export function myCustomAssertion(value: any): void {
  // assertion logic
}
```

## 🐛 Troubleshooting

**Tests fail to run:**
- Ensure Node.js 16+ is installed: `node --version`
- Run `npm install` again if dependencies are missing
- Clear cache: `npm test -- --clearCache`

**TypeScript errors:**
- Run `npm run build` to check compilation
- Check tsconfig.json paths configuration

**Timeout issues:**
- Increase `API_TIMEOUT_MS` in .env
- Check internet connection
- Verify API endpoint accessibility

## 📞 Support Resources

- Jest Documentation: https://jestjs.io/
- Axios Documentation: https://axios-http.com/
- TypeScript Handbook: https://www.typescriptlang.org/docs/

---

**Framework ready for use! 🎉**

Start writing your API tests with confidence using the Page Object Model pattern, comprehensive assertions, and a production-ready structure.
