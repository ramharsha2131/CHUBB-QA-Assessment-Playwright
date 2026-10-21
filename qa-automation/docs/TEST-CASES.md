# Test cases and traceability

| ID | Layer | Priority | Scenario | Expected result | Automation |
|---|---|---|---|---|---|
| AUTH-01 | UI | P0 | Open login page | Login form and heading shown | `auth.spec.js` |
| AUTH-02 | UI | P0 | Invalid password | Error message, user remains on login | `auth.spec.js` |
| AUTH-03 | UI/E2E | P0 | Claimant logs in | Claims page loaded | `auth.spec.js` |
| AUTH-04 | UI/E2E | P0 | Admin logs in | Admin dashboard loaded | `auth.spec.js` |
| SEC-01 | API | P0 | Unauthenticated claims list | 401 or 403 | `api.spec.js` |
| SEC-02 | API | P0 | Unauthenticated admin claims | 401 or 403 | `api.spec.js` |
| CLAIM-01 | UI/E2E | P0 | Empty incident details | Next disabled | `claim-wizard.spec.js` |

## Follow-up candidates (not implemented)
- Cross-user claim access isolation (requires two independently provisioned claimants)
- Status transition restrictions (backend unit/integration)
- Duplicate submissions and retry/idempotency
- Kafka event publication and WebSocket UI synchronization
- Claim creation persists through full service stack
- Input boundaries, accessibility and performance

These are candidates, not claims of verified application behaviour.


## Current automated test count

**7 automated Playwright test cases** are implemented in this suite: AUTH-01 through AUTH-04 (4), SEC-01 through SEC-02 (2), and CLAIM-01 (1). Follow-up candidates above are not implemented and are not included in this count. Existing application unit/component tests are separate and are not included in this Playwright total.
