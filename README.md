# Playwright + TypeScript Test Automation Portfolio

A small, focused automation framework demonstrating UI and API test
design with **Playwright** and **TypeScript**, built using the **Page
Object Model (POM)** and wired into **CI/CD via GitHub Actions**.

Built as a portfolio project to demonstrate patterns used in
production test automation: reusable page objects, negative-path
coverage, data-driven assertions, and API contract testing — the same
practices applied at scale in enterprise backend/API automation work.

## What this covers

| Area | What's demonstrated |
|---|---|
| UI automation | Login flows (happy path + 3 negative cases), cart state, dynamic sorting assertions |
| API automation | GET / POST / PUT against a REST API, status codes, schema/contract checks |
| Design pattern | Page Object Model — locators and actions isolated from test logic |
| CI/CD | GitHub Actions workflow running the full suite on every push/PR, with HTML report artifacts |
| Reporting | Playwright's built-in HTML reporter, trace/video/screenshot capture on failure |

## Stack

- [Playwright](https://playwright.dev/) + [TypeScript](https://www.typescriptlang.org/)
- Target apps: [Sauce Demo](https://www.saucedemo.com/) (UI) and [reqres.in](https://reqres.in/) (API) — both public, purpose-built for automation practice

## Project structure

```
playwright-ts-portfolio/
├── pages/              # Page Object Model classes
│   ├── LoginPage.ts
│   └── InventoryPage.ts
├── tests/
│   ├── ui/              # Browser-driven E2E tests
│   └── api/              # API contract tests via Playwright's request context
├── .github/workflows/    # CI pipeline definition
├── playwright.config.ts
└── tsconfig.json
```

## Running locally

```bash
npm install
npx playwright install --with-deps

npm test              # run everything
npm run test:ui        # UI suite only
npm run test:api       # API suite only
npm run test:headed    # watch the browser while it runs
npm run report         # open the last HTML report
```

## Why these choices

- **Sauce Demo** ships seeded users specifically for negative testing
  (`locked_out_user`, mismatched credentials), which made it possible
  to show real edge-case design rather than only happy-path coverage.
- **reqres.in** is a stable public mock API, letting the API suite
  demonstrate request/response contract validation without needing a
  backend of my own to stand up.
- Page Object Model keeps test files readable as *behavior*, while
  locators and low-level actions live in one place — the same
  separation of concerns used in larger production suites.

## About me

I'm a Test Automation Engineer with backend/API automation experience
in Java, REST Assured, and GraphQL. This project reflects my move into
Playwright and TypeScript, applying the same testing discipline
(POM, CI/CD integration, defect-oriented coverage) to a new stack.

[LinkedIn](https://www.linkedin.com/in/fernandocotti/) · [GitHub](#)
