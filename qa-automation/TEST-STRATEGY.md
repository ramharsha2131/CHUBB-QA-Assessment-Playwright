# Risk-based QA strategy

## Source-code assessment
The supplied ZIP differs from the separate brief: **Next.js 16 / React 19**, not Angular. It also already includes Vitest/Testing Library tests and Spring Boot JUnit tests, whereas the brief says there are none. Preserve those suites and add targeted cross-layer coverage rather than falsely claiming the baseline is untested.

Observed application layers: Next.js UI on 3001; Spring Boot BFF on 8090; Spring Boot claims service on 8080; Keycloak authentication; PostgreSQL; Redis; Kafka. Existing test files are present under `code/demo-app-ui` and `code/claims-service`.

## Highest risks
1. **Authorization and claim ownership (P0)**: insurance claims contain user-sensitive data; an unauthorized user must not access claims or admin functions.
2. **Claim submission correctness (P0)**: missing incident details or invalid amounts should not result in submitted claims.
3. **Claim status transitions (P1)**: inconsistent status handling could misrepresent claim processing.
4. **Messaging and realtime updates (P1)**: Kafka/WebSocket delivery and eventual UI consistency can fail independently of HTTP.
5. **Caching (P1)**: stale dashboard statistics may mislead users.

## Coverage chosen
This separate Playwright suite targets authentication, role routing, anonymous API access and initial claim wizard validation. The supplied React component tests and Java unit tests remain in their native modules and can be run separately. The full-stack scenarios require the Docker application to be running.

## Deliberately excluded / future work
No full Kafka, WebSocket, performance, visual-regression, or end-to-end claim creation assertions in this initial focused suite. These require more setup, deterministic test data and/or dedicated infrastructure. Prioritize cross-user ownership and status transitions next.

## Review findings and limitations
- **Documentation mismatch**: the assessment describes Angular and no tests; the supplied application is React/Next.js and includes tests. This is a verifiable inconsistency, not an application bug.
- **Validation status:** The seven-test Playwright suite was executed successfully against the locally running Docker Compose application using Chromium in headed mode with one worker. All seven tests passed: two API authorization tests, four authentication and authorization tests, and one claim-wizard validation test. Parallel execution previously showed failures, so parallel reliability remains an area for investigation. These results confirm only the current Playwright suite; they do not establish that all component, unit, or integration suites pass.
- **Credentials**: the sample users are documented in the original repository README. Override them with environment variables for non-demo environments.
- **Test isolation**: authentication tests use shared demo accounts but do not modify claims; future create/update tests should generate unique data and clean up.

## Engineering choices
Separate tests and reusable page objects/fixtures; explicit assertions rather than unconditional passes; screenshot/video/trace on failure; configurable URLs; small, independent cases.
