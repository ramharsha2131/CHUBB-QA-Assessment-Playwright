# Playwright Test Results

## Verified local run
- Command: `npm test`
- Result: 9 passed, 0 failed.
- Environment: local development stack with Docker Compose and Chromium.
- Date: 2026-10-27 (latest local run).
- Duration: 41.3 seconds.
- Admin claim-list loading is synchronized against its API response and loading state before the workflow asserts claim rows.
- HTML report: [Open Playwright test report](playwright-report/index.html).

The suite includes four authentication cases, two API authorization cases, one claim wizard validation case, and two claim lifecycle cases. Rerun the tests after code/configuration changes and when validating on another machine.
