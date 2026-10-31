# Playwright Test Results

## Historical verified local run
- Command: `npm test`
- Result: 9 passed, 0 failed.
- Environment: local development stack with Docker Compose and Chromium.
- Date: 2026-10-27.
- Duration: 41.3 seconds.
- Admin claim-list loading is synchronized against its API response and loading state before the workflow asserts claim rows.
- HTML report: [Open Playwright test report](playwright-report/index.html).

That run covered the nine cases recorded at the time: four authentication cases, two API authorization cases, one claim-wizard validation case, and two claim-lifecycle cases.

## Latest verified local run
- Command: `npm test` (from `qa-automation/`)
- Result: 11 passed, 0 failed, 0 skipped.
- Environment: local Docker application stack and Chromium.
- Date: 2026-10-31.
- Duration: 17.7 seconds.
- HTML report: [Open Playwright test report](playwright-report/index.html).

## Current inventory

The current Playwright specs declare 11 cases, including `CLAIMANT-NEG-01` and `ADMIN-NEG-01` in `tests/role-access-negative.spec.js`. All 11 current cases passed in the latest verified run above.

Five UI defects were manually reproduced in the running application on 2026-10-31. Their screenshots are linked in [DEFECTS.md](DEFECTS.md) and stored under `evidence/`. These exploratory reproductions are not Playwright test results.

Rerun the tests after code/configuration changes and when validating on another machine.
