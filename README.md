# Playwright TypeScript Automation Framework

![Playwright](https://img.shields.io/badge/Playwright-TypeScript-45ba4b)
![Node.js](https://img.shields.io/badge/Node.js-22-green)
![Docker](https://img.shields.io/badge/Docker-enabled-blue)
![GitHub Actions](https://img.shields.io/badge/CI-GitHub%20Actions-black)
![Playwright Tests](https://github.com/letiushev/qa-automation-demo/actions/workflows/tests.yml/badge.svg)

End-to-end test automation framework built with **Playwright + TypeScript**.

The project demonstrates a production-style QA automation architecture with UI and API testing, Page Objects, fixtures, reusable test data, authentication state, Docker execution, reporting, and CI pipelines.

## Tech Stack

- Playwright
- TypeScript
- Node.js
- Docker
- GitHub Actions
- ESLint
- Prettier
- Allure Report
- Playwright HTML Report

## Tested Applications

### UI

OrangeHRM Demo

Used for:

- authentication
- navigation
- employee management
- search
- CRUD scenarios
- negative scenarios

### API

JSONPlaceholder

Used for:

- GET
- POST
- PATCH
- DELETE
- response validation
- status code validation
- headers validation

## Architecture

```text
qa-automation-demo/
│
├── api/
│   └── PostsApi.ts
│
├── pages/
│   ├── LoginPage.ts
│   ├── DashboardPage.ts
│   ├── PimPage.ts
│   └── AddEmployeePage.ts
│
├── fixtures/
│   ├── pages.fixture.ts
│   └── api.fixture.ts
│
├── tests/
│   ├── auth.setup.ts
│   │
│   ├── auth/
│   │   └── login.spec.ts
│   │
│   ├── ui/
│   │   ├── pim.spec.ts
│   │   └── employee.spec.ts
│   │
│   └── api/
│       └── posts.spec.ts
│
├── types/
│   └── Post.ts
│
├── utils/
│   └── testData.ts
│
├── playwright.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── Dockerfile
├── docker-compose.yml
└── package.json
```

## Framework Flow

```text
                     ┌───────────────────┐
                     │      Tests        │
                     │   UI / API / Auth │
                     └─────────┬─────────┘
                               │
                ┌──────────────┴──────────────┐
                │                             │
                ▼                             ▼
        ┌───────────────┐             ┌───────────────┐
        │   Fixtures    │             │  API Fixtures │
        └───────┬───────┘             └───────┬───────┘
                │                             │
                ▼                             ▼
        ┌───────────────┐             ┌───────────────┐
        │ Page Objects  │             │  API Clients  │
        └───────┬───────┘             └───────┬───────┘
                │                             │
                ▼                             ▼
        ┌───────────────┐             ┌───────────────┐
        │   OrangeHRM   │             │JSONPlaceholder│
        └───────────────┘             └───────────────┘
```

## Authentication

UI authentication uses Playwright `storageState`.

A dedicated setup project logs in once and stores the authenticated browser state:

```text
auth.setup.ts
        ↓
login
        ↓
storageState
        ↓
playwright/.auth/user.json
        ↓
authenticated UI tests
```

This avoids repeating UI login before every authenticated test.

## Environment Variables

Create `.env` in the project root:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
```

The `.env` file is excluded from Git.

## Installation

Install dependencies:

```bash
npm ci
```

Install Playwright browsers if running outside Docker:

```bash
npx playwright install --with-deps
```

## Running Tests

Run all tests:

```bash
npm test
```

Run UI tests:

```bash
npm run test:ui
```

Run API tests:

```bash
npm run test:api
```

Run authentication tests:

```bash
npm run test:auth
```

Run tests with visible browser:

```bash
npm run test:headed
```

Run smoke tests:

```bash
npm run test:smoke
```

Run regression tests:

```bash
npm run test:regression
```

## Docker

Build the image:

```bash
docker compose build
```

Run the complete suite inside Docker:

```bash
npm run test:docker
```

Equivalent command:

```bash
docker compose run --rm tests
```

The Docker environment contains the Playwright browsers and required system dependencies, making test execution independent from the local machine configuration.

## Code Quality

Run ESLint:

```bash
npm run lint
```

Automatically fix supported lint issues:

```bash
npm run lint:fix
```

TypeScript validation:

```bash
npm run typecheck
```

Check formatting:

```bash
npm run format:check
```

Format the project:

```bash
npm run format
```

## Reports

### Playwright HTML Report

```bash
npm run report
```

### Allure

Generate report:

```bash
npm run allure:generate
```

Open report:

```bash
npm run allure:open
```

Failed tests can produce:

- screenshots
- video
- Playwright traces
- HTML reports
- Allure results

## CI/CD

GitHub Actions runs the framework automatically on:

```text
push
pull request
```

Pipeline:

```text
Checkout
   ↓
Docker Build
   ↓
ESLint
   ↓
TypeScript Check
   ↓
Playwright Tests
   ↓
Upload Reports / Artifacts
```

Secrets are stored in GitHub Actions:

```text
BASE_URL
ADMIN_USERNAME
ADMIN_PASSWORD
```

The main branch is protected by required CI checks.

## Test Design

The framework uses:

- Page Object Model
- Playwright fixtures
- reusable API clients
- typed API models
- dynamic test data
- authenticated browser state
- smoke and regression tagging
- `test.step()` reporting
- Dockerized execution
- CI quality gates

## Example UI Scenario

```text
Authenticate
   ↓
Open PIM
   ↓
Create employee
   ↓
Verify employee
   ↓
Search employee
   ↓
Delete employee
```

## Example API Scenario

```text
Request
   ↓
HTTP status validation
   ↓
Response body validation
   ↓
TypeScript typed model
```

## Current Test Targets

### UI

- successful login
- invalid login
- PIM navigation
- employee creation
- employee search
- employee deletion

### API

- get post
- create post
- update post
- delete post
- nonexistent resource
- content type validation
