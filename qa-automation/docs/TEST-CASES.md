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
| E2E-CLAIM-ADMIN-01 | UI/E2E | P1 | Claimant submits claim; admin reviews and approves it | Claim is created and status moves Submitted → Under Review → Approved | `claimant-admin-e2e.spec.js` |
| ADMIN-01 | UI/E2E | P1 | Admin reviews and approves a newly submitted claim | Status transitions are confirmed and persisted | `admin-claims.spec.js` |
| CLAIMANT-NEG-01 | UI | P0 | Claimant opens admin claims route directly | Redirected to claimant claims; admin controls are absent | `role-access-negative.spec.js` |
| ADMIN-NEG-01 | UI | P1 | Admin inspects transitions after approval | Earlier statuses are unavailable; only allowed next status is offered | `role-access-negative.spec.js` |

## Follow-up candidates (not implemented)
- Cross-user claim access isolation (requires two independently provisioned claimants)
- Backend enforcement of status transition restrictions (UI option coverage exists as `ADMIN-NEG-01`)
- Duplicate submissions and retry/idempotency
- Kafka event publication and WebSocket UI synchronization
- Claim creation persists through full service stack
- Input boundaries, accessibility and performance

These are candidates, not claims of verified application behaviour.


## Current automated test count

**11 automated Playwright test cases** are defined in the current specs: AUTH-01 through AUTH-04 (4), SEC-01 through SEC-02 (2), CLAIM-01 (1), E2E-CLAIM-ADMIN-01 and ADMIN-01 (2), and CLAIMANT-NEG-01 and ADMIN-NEG-01 (2). The claim-lifecycle tests create unique test data and do not depend on a hardcoded claim ID. This is an inventory, not a claim that all 11 have passed in a running environment. Existing application unit/component tests are separate and are not included in this Playwright total. Exploratory UI findings are tracked separately in [../DEFECTS.md](../DEFECTS.md).
