# CHUBB APAC â€” QA automation (separate folder)

A focused, maintainable Playwright/JavaScript suite against the supplied claims management demo. Keep this folder within the original repository; open the **repository root** in VS Code.

## Actual architecture / discrepancy
The supplied project is **Next.js + React**, not Angular as the separate assessment brief states. It already contains Java JUnit and React Testing Library tests. This package adds full-stack browser and API checks, not a replacement for those suites.

## Prerequisites
- Node.js 20+ and npm
- Docker Desktop (running) to start the supplied application
- JDK 21 / Maven to build backend services using the original scripts
- VS Code with Playwright Test extension (optional)

## Start the supplied application
From the repository root, use the all-in-one Compose file described in the main `README.md`:

```powershell
docker compose up --build -d --wait
```

Docker builds the backend JARs and starts the complete stack. The former split Compose/scripts workflow is still available; use Git Bash or WSL for the `.sh` scripts.

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
- `pages/`: login, claim wizard, and admin claim page objects
- `data/`: central credentials and unique claim test data
- `tests/`: authentication, API security, wizard validation, role-access negatives, claimant-to-admin E2E, and admin status workflow (11 declared cases)
- `docs/TEST-CASES.md`: concise ID traceability matrix and deferred scenarios
- `tescases.md`: detailed case steps, boundary/data-driven classifications, and links to manual defect reproductions
- `evidence/`: screenshots for the five reproduced UI defects documented in `DEFECTS.md`
- `DEFECTS.md`: UI defect descriptions, reproduction steps, and screenshot evidence
- `TEST-STRATEGY.md`: risk and scope decisions
- `AI-WORKING-JOURNAL.md`: transparent AI decisions

## Reporting and limitations
HTML report: `qa-automation/playwright-report/index.html`. Screenshots, videos and traces are retained on failure under `test-results/`. A test that exposes a genuine defect should be kept and documented, not made to pass artificially. The new end-to-end tests require the supplied Docker stack to be running. Execute the full suite in your environment and confirm the result before submission.

## Suggested commit sequence (create commits when work is genuinely performed)
1. `docs: assess source architecture and testing risks`
2. `test: add Playwright fixtures and auth scenarios`
3. `test: add API authorization and wizard validation checks`
4. `docs: record results and AI decisions`

Do not fabricate a commit history or claim unperformed work.

## Claim lifecycle scenarios
The suite includes two additional full-stack tests. Both create unique claim data at runtime and extract the displayed claim ID from the table; neither hardcodes a claim ID. The admin test creates its own claim before changing status, so it does not depend on a pre-existing `Submitted` record. Status changes are selected only when the current dropdown offers that transition.

Latest verified local test result: 11 passed, 0 failed, using `npm test` on 31 October 2026. The earlier 9-pass run from 27 October is historical. See [TEST-RESULTS.md](TEST-RESULTS.md) for both runs; rerun after future code or configuration changes. The application stack must be running for tests that depend on the full application.
