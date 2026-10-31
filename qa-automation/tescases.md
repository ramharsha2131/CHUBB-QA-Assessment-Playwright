# Playwright Test Cases

This document describes the 11 cases declared by the current Playwright specs. Test code is unchanged.

## Authentication and authorization

### AUTH-01: Login form is accessible
- **Category:** Authentication / UI
- **Boundary test:** No
- **Data-driven:** No
- **Steps:**
  1. Open the login page.
  2. Check that the `Log In` heading is visible.
- **Expected result:** The login form is available to the user.
- **Source:** `tests/auth.spec.js`

### AUTH-02: Invalid credentials are rejected
- **Category:** Authentication / Negative UI
- **Boundary test:** No
- **Data-driven:** No
- **Steps:**
  1. Open the login page.
  2. Submit the claimant email with an incorrect password.
  3. Check for the invalid-credentials message and remain on the login page.
- **Expected result:** Login is denied and the user is not redirected to claims.
- **Source:** `tests/auth.spec.js`

### AUTH-03: Claimant can log in and access claims
- **Category:** Authentication / Role access
- **Boundary test:** No
- **Data-driven:** No
- **Steps:**
  1. Open the login page.
  2. Sign in with the claimant account.
  3. Check that the claims page URL is loaded.
- **Expected result:** The claimant reaches the claims page.
- **Source:** `tests/auth.spec.js`

### AUTH-04: Admin is routed to the admin dashboard
- **Category:** Authentication / Role access
- **Boundary test:** No
- **Data-driven:** No
- **Steps:**
  1. Open the login page.
  2. Sign in with the admin account.
  3. Check that the admin dashboard URL is loaded.
- **Expected result:** The admin reaches the admin dashboard.
- **Source:** `tests/auth.spec.js`

## API security

### SEC-01: Anonymous requests cannot read claims
- **Category:** API security / Negative
- **Boundary test:** No
- **Data-driven:** No
- **Steps:**
  1. Send an unauthenticated GET request to `/api/claims`.
  2. Check the HTTP response status.
- **Expected result:** The API returns `401` or `403`.
- **Source:** `tests/api.spec.js`

### SEC-02: Anonymous requests cannot access admin claims
- **Category:** API security / Negative
- **Boundary test:** No
- **Data-driven:** No
- **Steps:**
  1. Send an unauthenticated GET request to `/api/admin/claims`.
  2. Check the HTTP response status.
- **Expected result:** The API returns `401` or `403`.
- **Source:** `tests/api.spec.js`

## Claim submission validation

### CLAIM-01: Empty incident details prevent advancing
- **Category:** Claim validation / Negative UI
- **Boundary test:** **Yes.** This checks the empty-value boundary for required incident details.
- **Data-driven:** No
- **Steps:**
  1. Sign in with the claimant account.
  2. Open the new-claim wizard.
  3. Leave the first step's incident details empty.
  4. Check that the `Next` button is disabled.
- **Expected result:** The claimant cannot advance without required incident details.
- **Source:** `tests/claim-wizard.spec.js`

## Claim lifecycle

### E2E-CLAIM-ADMIN-01: Claimant submits a claim and admin approves it
- **Category:** End-to-end / Claim lifecycle
- **Boundary test:** No
- **Data-driven:** No. The test generates unique claim data for isolation; it does not run against a parameterized set of datasets.
- **Steps:**
  1. Sign in as a claimant and open the new-claim wizard.
  2. Enter incident and supporting details, verify the review details, and submit.
  3. Capture the displayed claim ID and sign out.
  4. Sign in as admin and locate the claim in `Submitted` status.
  5. Change it to `Under Review`, confirm it appears under that status, then change it to `Approved`.
  6. Check that the claim displays `Approved`.
- **Expected result:** The submitted claim can be found and moved through the review workflow to `Approved`.
- **Source:** `tests/claimant-admin-e2e.spec.js`

### ADMIN-01: Admin reviews and approves a newly submitted claim
- **Category:** End-to-end / Admin workflow
- **Boundary test:** No
- **Data-driven:** No. The test generates unique claim data for isolation; it does not run against a parameterized set of datasets.
- **Steps:**
  1. Sign in as a claimant, create a claim, and capture its displayed ID.
  2. Sign out, then sign in as admin.
  3. Find the claim under `Submitted` and change it to `Under Review`.
  4. Find it under `Under Review` and change it to `Approved`.
  5. Check that the claim displays `Approved`.
- **Expected result:** The admin can review and approve the newly created claim.
- **Source:** `tests/admin-claims.spec.js`

## Role-based access and status restrictions

### CLAIMANT-NEG-01: Claimant cannot open admin claims management
- **Category:** Role-based access / Negative UI
- **Boundary test:** No
- **Data-driven:** No
- **Steps:**
  1. Sign in with the claimant account.
  2. Navigate directly to `/admin/claims`.
  3. Check that the user is redirected to the claims page, the `My Claims` heading is visible, and admin-only controls are absent.
- **Expected result:** A claimant cannot access admin claims management.
- **Source:** `tests/role-access-negative.spec.js`

### ADMIN-NEG-01: Admin cannot move an approved claim to an earlier status
- **Category:** Role-based access / Status transition negative
- **Boundary test:** No. This verifies a forbidden state transition, not an input-value boundary.
- **Data-driven:** No. The test creates a unique claim for isolation but does not run against a parameterized set of datasets.
- **Steps:**
  1. Sign in as a claimant and create a claim with unique test data.
  2. Sign in as admin and locate the new claim.
  3. Move the claim from `Submitted` to `Under Review`, then to `Approved`.
  4. Inspect the status options for the approved claim.
  5. Check that `Submitted`, `Under Review`, and `Rejected` are not available options.
- **Expected result:** An approved claim cannot be moved back to an earlier status; only the currently allowed option, `Closed`, is offered.
- **Source:** `tests/role-access-negative.spec.js`

## Test type summary

- **Total automated cases documented:** 11.
- **Boundary:** CLAIM-01 checks the empty-value boundary for required fields. No maximum-length, numeric-range, date-range, or other upper/lower input-boundary checks are included.
- **Data-driven:** None of the 11 tests is parameterized over multiple inputs. Tests that create unique claims use generated runtime data, which supports test isolation but is not data-driven testing.

## Source inventory note

The traceability matrix in `docs/TEST-CASES.md` lists all 11 current test declarations. The 11-case suite passed on 2026-10-31; the nine-case run recorded earlier in `TEST-RESULTS.md` is historical.

## Manual UI defect reproductions

These five exploratory checks were reproduced in the browser on 2026-10-31. They are defect evidence, not automated Playwright cases, and are not included in the 11-case count.

| Defect ID | Manual scenario | Evidence |
|---|---|---|
| DEFECT-UI-001 | Admin's View Details action displays a placeholder toast | [Screenshot](evidence/DEFECT-UI-001.png) |
| DEFECT-UI-002 | User search returns no results when the term has surrounding spaces | [Screenshot](evidence/DEFECT-UI-002.png) |
| DEFECT-UI-003 | Whitespace-only required claim details advance to Review | [Screenshot](evidence/DEFECT-UI-003.png) |
| DEFECT-UI-004 | Invalid whitespace-only claim submission displays a generic failure | [Screenshot](evidence/DEFECT-UI-004.png) |
| DEFECT-UI-005 | Claim records remain visible after logout and direct navigation | [Screenshot](evidence/DEFECT-UI-005.png) |
