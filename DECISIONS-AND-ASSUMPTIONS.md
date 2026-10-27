# Decisions and Assumptions

## Decisions
- Keep the existing application structure and technology choices.
- Keep Playwright tests in `qa-automation/tests`.
- Use page objects and shared fixtures for reusable browser interactions.
- Generate claim data during test execution and discover claim IDs from the application.
- Keep environment-specific settings in configuration rather than scattering them across tests.
- Keep the existing hexagonal Java packages (`adapter`, `application`, `domain`) instead of moving source to a new directory layout.
- Add a root `docker-compose.yml` for one-command startup while retaining the existing split Compose files and scripts.
- Build backend JARs in multi-stage Docker builds so the root Compose setup does not require Java or Maven on the host.
- Keep API contracts in OpenAPI and event contracts in AsyncAPI under each service's `src/main/resources`.
- Record only prompts and work details available in this task session; do not reconstruct missing history or attribute it to another AI tool.

## Assumptions
- The demo application and its supporting services must be available before end-to-end tests run.
- Test credentials and service URLs must match the local environment.
- Test results are environment-specific; passing locally does not guarantee passing in every environment.
- Existing application API contracts and migrations remain the source of truth.
- Docker Compose v2.20 or newer is available, and local ports listed in the README are not already occupied.
- The default Compose configuration is for local assessment, not production deployment.

## Limitations
- Docker startup and image builds must be validated on the target machine and may take several minutes on first use.
- The prompt log covers the prompts visible in the current task context only; it is not a complete historical export.
- Default demo credentials and development-mode Keycloak are not production-safe.
