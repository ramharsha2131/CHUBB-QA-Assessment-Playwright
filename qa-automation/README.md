# CHUBB APAC — QA automation (separate folder)

A focused, maintainable Playwright/JavaScript suite against the supplied claims management demo. Keep this folder within the original repository; open the **repository root** in VS Code.

## Actual architecture / discrepancy
The supplied project is **Next.js + React**, not Angular as the separate assessment brief states. It already contains Java JUnit and React Testing Library tests. This package adds full-stack browser and API checks, not a replacement for those suites.

## Prerequisites
- Node.js 20+ and npm
- Docker Desktop (running) to start the supplied application
- JDK 21 / Maven to build backend services using the original scripts
- VS Code with Playwright Test extension (optional)

## Start the supplied application
From the repository root, follow its `README.md` and run the infrastructure/application scripts in a shell that supports `.sh` (Git Bash or WSL on Windows):

```bash
./start-infra.sh
./start-app.sh
```

Wait until http://localhost:3001/login is accessible and backend services are healthy. Docker is required for integration/E2E runs. On Windows, use Git Bash/WSL for the scripts; see root README for more details.

## Install and run the separate tests in VS Code
Open a new VS Code terminal **in `qa-automation`**:

```bash
npm install
npx playwright install chromium
npm test
npm run test:smoke
npm run test:api
npm run report
```

On Windows PowerShell, `cd qa-automation` then run the same npm commands. To run visually: `npm run test:headed` or `npm run test:ui`. This suite uses plain JavaScript; no TypeScript compiler is required.

Copy `.env.example` to `.env` for reference; Playwright does not auto-load `.env`. Set variables in your terminal if overriding defaults. Demo credentials are from the supplied repository's README and should not be used for production.

## Run pre-existing component/unit suites
From `code/demo-app-ui`: `npm install && npm test` (React Testing Library/Vitest).
From `code/claims-service`: `./mvnw test` (Git Bash/WSL) or `mvnw.cmd test` (Windows). Some Java integration tests may need Docker/Testcontainers. `code/bff-service` may have its own tests as well.

## Files
- `playwright.config.js`: browsers, reporting, failure artifacts, timeouts
- `fixtures/test.js`: shared Playwright fixture
- `pages/login.page.js`: login page object
- `data/users.js`: central test credentials
- `tests/`: authentication, API security, wizard validation
- `docs/TEST-CASES.md`: test matrix and deferred scenarios
- `TEST-STRATEGY.md`: risk and scope decisions
- `AI-WORKING-JOURNAL.md`: transparent AI decisions

## Reporting and limitations
HTML report: `qa-automation/playwright-report/index.html`. Screenshots, videos and traces are retained on failure under `test-results/`. A test that exposes a genuine defect should be kept and documented, not made to pass artificially. This generated suite has not been verified against a running Docker stack here; confirm actual results before submission.

## Suggested commit sequence (create commits when work is genuinely performed)
1. `docs: assess source architecture and testing risks`
2. `test: add Playwright fixtures and auth scenarios`
3. `test: add API authorization and wizard validation checks`
4. `docs: record results and AI decisions`

Do not fabricate a commit history or claim unperformed work.
