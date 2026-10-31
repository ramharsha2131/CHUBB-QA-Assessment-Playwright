# AI working journal

This journal records the AI-assisted work visible in the current task session. It is not a complete record of earlier sessions or a transcript from Claude.

| Date | Work and decision | Evidence / result |
|---|---|---|
| 2026-10-27 | Diagnosed the initial Playwright login failures as an unavailable Keycloak service; restored the stopped container and confirmed realm discovery before rerunning tests. | The login, claim wizard, and API cases passed after Keycloak became healthy. |
| 2026-10-27 | Fixed both claim lifecycle tests to filter for `Under Review` after the transition instead of relying on an outdated `Submitted`-filtered list. Existing test scenarios were kept intact. | Focused lifecycle tests passed (2/2); full Playwright suite passed (9/9). |
| 2026-10-27 | Documented the actual hexagonal Java source layout rather than moving code into new `api/`, `service/`, or `infrastructure/` folders. | Existing module boundaries, OpenAPI contracts, resources, and tests are preserved. |
| 2026-10-27 | Added a root Compose configuration and multi-stage backend builds so the full stack can be built and started using one command. Retained the split Compose files and scripts, and updated the legacy app script to let Docker build the JARs. | Compose configurations validated; both backend images built successfully one at a time. Full-stack startup was not run because the existing local stack was already using its ports. |
| 2026-10-27 | Added a prompt record for the prompts available in this task context; did not invent unavailable history or label this as a Claude transcript. | See `prompts/2026-10-27-task-session.md`. |
| 2026-10-31 | Reproduced the five documented UI defects in the running browser and captured PNG evidence. Updated the test inventory and related strategy, results, architecture, README, decisions, and prompt documentation without changing test code. | Screenshots are linked from `DEFECTS.md` and stored in `evidence/`. The specs declare 11 cases; the 9-pass result remains historical from 2026-10-27, and the full 11-case suite was not rerun. See `prompts/2026-10-31-documentation-and-defect-evidence.md`. |
| 2026-10-31 | Ran the complete current Playwright suite after the documentation update. | `npm test` from `qa-automation/`: 11 passed, 0 failed in 17.7 seconds with Chromium and the local Docker stack. See `TEST-RESULTS.md`. |

The visible user requests and resulting actions are summarized in the dated prompt records. The test implementations were not changed during the 2026-10-31 documentation and evidence update.
