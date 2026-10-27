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
This separate Playwright suite targets authentication, role routing, anonymous API access, initial claim wizard validation, and the claimant-to-admin claim lifecycle including status transitions. The supplied React component tests and Java unit tests remain in their native modules and can be run separately. The full-stack scenarios require the Docker application to be running.

## Deliberately excluded / future work
No full Kafka, WebSocket, performance, visual-regression, or end-to-end claim creation assertions in this initial focused suite. These require more setup, deterministic test data and/or dedicated infrastructure. Prioritize cross-user ownership and status transitions next.

## Review findings and limitations
- **Documentation mismatch**: the assessment describes Angular and no tests; the supplied application is React/Next.js and includes tests. This is a verifiable inconsistency, not an application bug.
- **Execution status**: JavaScript syntax validation is performed during packaging. The full Playwright suite still needs execution against the running Docker stack; do not treat the tests as passing until that run completes.
- **Credentials**: the sample users are documented in the original repository README. Override them with environment variables for non-demo environments.
- **Test isolation**: authentication tests use shared demo accounts but do not modify claims; claim create/update tests generate unique data; test records may remain in the demo database after execution.

## Engineering choices
Separate tests and reusable page objects/fixtures; explicit assertions rather than unconditional passes; screenshot/video/trace on failure; configurable URLs; small, independent cases.
