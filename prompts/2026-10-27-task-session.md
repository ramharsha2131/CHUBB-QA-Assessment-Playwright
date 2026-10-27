# Prompt 1: Debug Existing Playwright Test Cases

Review the existing Playwright automation project and debug all failing test cases.

Requirements:
- Analyze the existing test files, configuration, test data, locators, and failure logs.
- Identify the root cause of each failure before making changes.
- Fix the issues with minimal modifications.
- Preserve all existing test cases, test names, assertions, and intended test coverage.
- Do not delete, skip, disable, or weaken any existing tests to make the suite pass.
- Avoid modifying application code unless absolutely necessary and justified.
- Run the complete test suite after the fixes and report the results.

Provide a summary of the root causes, files changed, fixes applied, and final test execution results.
# Prompt 2: Improve Repository Documentation

Review the existing repository and create or update the README.md file with the following sections:

1. Project Overview — Explain the purpose and functionality of the application.
2. Architecture — Describe the application architecture and the responsibilities of its major components.
3. Setup Instructions — Provide clear prerequisites, installation steps, configuration, and startup instructions.
4. API Reference — Document the available API endpoints, HTTP methods, request parameters, request bodies, response formats, and error responses based on the actual implementation.
5. Testing — Explain how to install dependencies, run individual tests, execute the complete Playwright test suite, and generate test reports.
6. Troubleshooting — Include common setup and test execution issues with solutions.

Use the actual repository structure and implementation as the source of truth. Do not invent endpoints, features, configuration values, or test results.

Keep the documentation concise, professional, accurate, and easy for another developer or examiner to follow.
# Prompt 3: Review and Organize the Source Code Structure

Review the existing project and assess whether the source code is organized into appropriate layers.

Where applicable, use the following structure:

src/
  api/
  domain/
  service/
  infrastructure/

test/
resources/
  application.yml
  db/
    migration/
  openapi/

Requirements:
- Keep API contracts, business logic, service orchestration, and infrastructure responsibilities clearly separated where appropriate.
- Store automated tests in the appropriate test directory.
- Keep application configuration, database migrations, and OpenAPI specifications in suitable resource directories.
- Do not introduce unnecessary architectural changes or duplicate existing functionality.
- Do not move or rename files in a way that breaks existing imports, configuration, or tests.
- Adapt the proposed structure to the project's actual technology stack.

If a component is not applicable, explain why instead of creating an empty directory or adding unnecessary dependencies.

Document any recommended structural changes before implementing potentially disruptive modifications.
# Prompt 4: Provide One-Command Local Setup Using Docker Compose

Review the existing application and determine whether it can be started locally using Docker Compose.

Requirements:
- Create or update docker-compose.yml only as needed for the actual application.
- Include the services and dependencies required to run the application, such as a database, only when applicable.
- Configure ports, environment variables, health checks, volumes, and service dependencies appropriately.
- Use environment variables for configurable or sensitive values. Do not commit credentials or secrets.
- Provide a simple local startup workflow, preferably:

  docker compose up --build

- Document how to configure the environment, verify application readiness, run the tests, inspect logs, and stop the services.
- Make sure the setup is reproducible on a clean machine with the documented prerequisites.

Do not claim that the setup works until it has been validated. Do not replace existing working infrastructure without a clear reason.
# Prompt 5: Validate the Test Suite and Preserve Existing Coverage

Review the entire existing Playwright test suite and verify that it remains functional after repository documentation and setup changes.

Requirements:
- Preserve all existing test cases and their intended behavior.
- Do not delete, skip, disable, or weaken assertions.
- Validate the Playwright configuration, browser setup, dependencies, environment variables, test data, and application readiness.
- Run the complete test suite using the project's supported command.
- Capture the number of passed, failed, skipped, and total tests.
- Investigate and fix failures caused by the recent changes.
- Clearly distinguish pre-existing failures, environment-related failures, and newly introduced regressions whenever evidence is available.

Provide the exact commands used and a summary of the final results. If any tests cannot be executed, explain the reason without reporting them as passed.
# Prompt 6: Record Technical Decisions and Assumptions

Create a concise technical decision and assumptions document, such as docs/DECISIONS.md.

Include:
- Project goals and scope.
- Architectural decisions and the reasons behind them.
- API contract and validation assumptions.
- Configuration and environment management decisions.
- Test framework and test execution strategy.
- Docker Compose and local development decisions.
- Error handling, logging, and security considerations.
- Known limitations, unresolved issues, and future improvements.

Base all decisions on the existing implementation and verified requirements. Clearly label assumptions that have not been confirmed.

Do not invent decisions, claim features that are not implemented, or make unrelated changes to application code or tests.
# Prompt 7: Maintain an AI Prompts and Development Journal

Create a prompts/ directory to preserve the prompts used during project development and maintenance.

Requirements:
- Store the prompts used for debugging, documentation, architecture review, environment setup, and test validation as separate, clearly named Markdown files.
- Preserve the original prompts where available.
- Do not fabricate historical prompts or claim that reconstructed prompts were used previously.
- Include the objective, relevant context, constraints, and expected output for each prompt.

Also create a development journal, such as docs/AI-DEV-JOURNAL.md, containing:
- Date and task.
- Initial problem or requirement.
- Investigation and findings.
- Changes made and the reasons for them.
- Files affected.
- Commands executed and actual results.
- Decisions, assumptions, and remaining issues.

If an existing Claude AI journal or session transcript is available, preserve it and reference it where appropriate. Otherwise, create a new journal based on verifiable information and label reconstructed entries accordingly.

Never include API keys, passwords, access tokens, or other sensitive information in prompts or journal entries.
# Prompt 8: Final Repository Readiness Audit

Perform a final repository readiness audit against the following checklist:

1. README.md contains the project overview, architecture, setup instructions, API reference, and testing instructions.
2. The source code has a clear and appropriate structure for the project's technology stack.
3. Test files are organized and executable using documented commands.
4. Resources and configuration files are present where applicable.
5. OpenAPI specifications and database migrations are documented or included when relevant.
6. Docker Compose provides a reproducible local setup when applicable.
7. Technical decisions and assumptions are documented.
8. The prompts/ directory contains the available project prompts.
9. The AI development journal records decisions and iterations without fabricating historical activity.
10. The existing Playwright test suite has been validated without deleting, skipping, disabling, or weakening existing tests.

Requirements:
- Inspect the actual repository rather than assuming that files or features exist.
- Make only necessary changes and preserve existing functionality.
- Run the documented setup and test commands where the environment permits.
- Report each checklist item as PASS, FAIL, or NOT APPLICABLE, with supporting evidence.
- List files created or modified and identify unresolved issues.
- Do not report unverified functionality or unexecuted tests as successful.

Deliver a concise final audit report suitable for sharing with an examiner.
