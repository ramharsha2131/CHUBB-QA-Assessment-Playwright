# Insurance Claims Management — QA Assessment

## Overview

A three-tier insurance claims management demo used for QA assessment. This repository contains the application, service contracts, database migrations, Docker Compose configuration, and a separate Playwright/JavaScript QA automation suite.

## Architecture

See [ARCHITECTURE.md](ARCHITECTURE.md) and `ss-demo-app.png`.

| Component | Technology | Default port |
|---|---|---:|
| Web UI | Next.js / React | 3001 |
| Backend-for-Frontend (BFF) | Spring Boot / Java 21 | 8090 |
| Claims service | Spring Boot / Java 21 | 8080 |
| Identity provider | Keycloak | 8180 |
| Database | PostgreSQL | 5432 |
| Cache | Redis | 6379 |
| Event streaming | Kafka | 9092 |
| Kafka UI | Kafka UI | 9093 |
| CDC (optional) | Debezium | 8083 |

The original application structure is retained under `code/`. The separate browser/API automation suite is under `qa-automation/`.

### Source layout

```text
code/
  demo-app-ui/                         Next.js UI and React component tests
  bff-service/src/
    main/java/.../adapter/             HTTP, security, messaging, and external adapters
    main/java/.../application/         Application use cases and ports
    main/java/.../domain/              Business entities, rules, and domain events
    main/resources/
      openapi/bff-api.yml              UI-to-BFF API contract
      asyncapi/                        Event contracts
    test/                               JUnit, contract, and integration tests
  claims-service/src/
    main/java/.../adapter/             Web, persistence, cache, and messaging adapters
    main/java/.../application/         Application use cases and ports
    main/java/.../domain/              Claim and user business rules
    main/resources/
      application*.yml                 Runtime and test configuration
      db/changelog/                    Liquibase schema migrations
      openapi/claims-api.yml           BFF-to-claims API contract
      asyncapi/                        Event contracts
    test/                               JUnit and integration tests
qa-automation/
  tests/                               Playwright browser and API tests
  pages/ fixtures/ data/               Shared test utilities and test data
prompts/                               Available AI prompt records
```

The original services use hexagonal package names (`adapter`, `application`, `domain`) rather than a literal `src/api`, `src/service`, or `src/infrastructure` directory. This keeps the established application structure intact while maintaining the same separation of API adapters, business use cases, domain logic, and infrastructure integrations.

## Set up

### Prerequisites

- Docker Desktop with Docker Compose v2.20 or newer
- Node.js 20+ and npm to run the test suites
- Java 21 and Maven only when building or running backend tests outside Docker
- Git Bash or WSL only when using the supplied `.sh` helper scripts

Check your installations:

```bash
docker --version
docker compose version
node --version
npm --version
```

### Start the complete application

From the repository root, build and start the entire stack with one command:

```powershell
docker compose up --build -d --wait
```

The root [docker-compose.yml](docker-compose.yml) starts infrastructure, builds both Java services inside Docker, starts the UI, and waits for health checks. On first run, image and dependency downloads may take several minutes. If you have an older stack running from the split Compose files, stop it first to release its ports:

```powershell
docker compose -f docker-compose.apps.yml down
docker compose -f docker-compose.infra.yml down
```

The original split `start-infra.sh` / `start-app.sh` workflow is still available; it starts infrastructure and application services separately. Docker builds the backend JARs, so Java and Maven are not required on the host.

### Application URLs

| Service | URL |
|---|---|
| Web UI | http://localhost:3001 |
| BFF Swagger UI | http://localhost:8090/swagger-ui.html |
| Claims Swagger UI | http://localhost:8080/swagger-ui.html |
| Keycloak | http://localhost:8180 |
| Kafka UI | http://localhost:9093 |

The preconfigured demo accounts are for local assessment only; never reuse these credentials in production.

To stop the one-command stack and retain its data:

```powershell
docker compose down
```

`docker compose down -v` also deletes the local PostgreSQL and Redis volumes. Use it only when you intentionally want to erase local data.

## API Reference

OpenAPI contracts are the source of truth for request/response shapes, authentication, and error responses:

- [BFF OpenAPI contract](code/bff-service/src/main/resources/openapi/bff-api.yml) — browser-facing authentication, claims, and admin operations.
- [Claims Service OpenAPI contract](code/claims-service/src/main/resources/openapi/claims-api.yml) — internal user, claim, and dashboard operations.
- [Claims Service migrations](code/claims-service/src/main/resources/db/changelog/) — Liquibase schema changes.
- `code/bff-service/src/main/resources/asyncapi/` and `code/claims-service/src/main/resources/asyncapi/` — asynchronous event contracts.

The principal BFF routes include `POST /api/auth/signup`, `POST /api/auth/login`, `POST /api/auth/refresh`, `POST /api/auth/logout`, `GET/POST /api/claims`, and admin dashboard/claims endpoints. The claims service contract describes user and claims CRUD, admin status transitions, and dashboard operations. See the linked OpenAPI files for full schemas, security requirements, and response codes.

When the stack is running, Swagger UI is available at [BFF Swagger UI](http://localhost:8090/swagger-ui.html) and [Claims Service Swagger UI](http://localhost:8080/swagger-ui.html).

## Testing

### Playwright browser and API suite

The separate suite in `qa-automation/` uses Playwright Test with JavaScript. After starting the application, run:

```powershell
Set-Location qa-automation
npm ci
npx playwright install chromium
npm test
```

The current specs declare 11 cases covering login and authorization, protected API routes, empty claim validation, claimant claim creation, admin status transitions, and role-based negative checks. Useful focused commands:

```powershell
npx playwright test --workers=1 --retries=0
npm test
npm run test:smoke
npm run test:api
npm run test:headed
npm run test:ui
npm run report
```

The application stack must be running for full-stack browser/API tests that depend on it.

The suite covers authentication, API access controls, claim wizard validation, claimant-to-admin claim processing, and admin status changes. Claim IDs are discovered at runtime rather than fixed in the tests.

**Latest verified result:** 11 passed, 0 failed using `npm test` on 2026-10-31. The 9-pass run from 2026-10-27 is historical. See [QA test results](qa-automation/TEST-RESULTS.md).

### Existing frontend and backend tests

Frontend tests:

```bash
cd code/demo-app-ui
npm install
npm test
```

Backend tests:

```bash
cd code/claims-service
mvn test
```

```bash
cd code/bff-service
mvn test
```

Some backend integration tests may require Docker and Testcontainers. Check each service's build configuration before interpreting failures.

## Diagnostics

```bash
docker compose ps
docker compose logs -f claims-service
docker compose logs -f bff-service
docker compose logs -f ui
```

Health endpoints:

- Claims service: http://localhost:8080/actuator/health
- BFF: http://localhost:8090/actuator/health

## Decisions, assumptions, and QA documentation

- [Architecture](ARCHITECTURE.md)
- [Decisions and assumptions](DECISIONS-AND-ASSUMPTIONS.md)
- [Playwright test strategy](qa-automation/TEST-STRATEGY.md)
- [Test case traceability matrix](qa-automation/docs/TEST-CASES.md)
- [Detailed test cases and manual defect reproductions](qa-automation/tescases.md)
- [UI defects and screenshot evidence](qa-automation/DEFECTS.md)
- [Saved defect screenshots and defect descriptions](qa-automation/DEFECTS.md)
- [Reported test results](qa-automation/TEST-RESULTS.md)
- [AI prompt records](prompts/README.md)
- [AI working journal](qa-automation/AI-WORKING-JOURNAL.md)
