# CHUBB QA Assessment — Demo App UI

This project uses Next.js and React. It was bootstrapped with `create-next-app`.

## Getting Started

Navigate to the UI project directory:

```bash
cd code/demo-app-ui
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to access the application when running the development server directly. If you're using Docker Compose, use the port configured for your environment.

## UI Unit Tests

The UI unit tests use Vitest and React Testing Library.

Run the complete unit-test suite:

```bash
npm test
```

### Latest Test Results

- **Test files:** 25 passed
- **Tests:** 266 passed, 0 failed
- **Execution time:** 14.76 seconds
- **Status:** All UI unit tests passed in the latest run.

Note: React emitted non-fatal `act(...)` warnings in some tests. These did not affect the results.

## Playwright Automation

Playwright end-to-end and API tests are maintained in the `qa-automation` directory at the repository root.

Run the automation suite from that directory:

```bash
cd ../../qa-automation
npm install
npx playwright test --workers=1
```

The latest recorded sequential run passed all 7 Playwright tests. Parallel execution previously showed reliability issues, so the suite was validated using one worker.

See `qa-automation/README.md` for the automation setup, test coverage, and execution details.

## Additional Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [Learn Next.js](https://nextjs.org/learn)
- [Vitest Documentation](https://vitest.dev/)
- [Playwright Documentation](https://playwright.dev/docs/intro)
