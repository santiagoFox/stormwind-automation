# Stormwind Playwright Project — Claude Guide

## Project overview

JavaScript Playwright test suite for the Stormwind Studios LMS (base URL: `https://test-spectre.pantheonsite.io/`).
Uses Page Object Model (POM) with a `BasePage` foundation, composed page objects, and Playwright fixtures for auth.

## Directory structure

```
specs/
  admin/     ← test specs for admin/manager flows
  nightly/   ← scheduled / nightly specs
  student/   ← test specs for student flows
pages/
  base.page.js        ← BasePage (all page objects extend this)
  login.page.js
  admin/              ← AdminXxxPage classes
  student/            ← StudentXxxPage classes
fixtures/
  fixtures.js         ← extends Playwright test with pre-authenticated pages
data/
  users.js            ← test user credentials
  urls.js             ← named URL constants
```

## Locator strategy — priority order

1. `getByRole(role, { name })` — most preferred; ties to ARIA semantics
2. `getByTestId(id)` — second preference when `data-testid` is present
3. `getByText(text)` — for readable-text assertions or links
4. `locator('css selector')` — fallback when semantic locators are unavailable

Avoid `page.locator('xpath=...')` and `page.$()`.

## STEP / REUSE_METHOD comment conventions

Use these two comment tags when writing specs and page objects to make
the intent clear and to flag extraction candidates.

### `// STEP N: <description>` (in spec files)

Marks each numbered action in a test. Keep the number sequential and the
description a one-liner that matches the corresponding page-object method.

```js
// STEP 1: Navigate to PL-300 course
await adminCourseDetails.gotoPL300Course();

// STEP 2: Click Assign Course button
await adminCourseDetails.clickAssignCourse();
```

### `// REUSE_METHOD: <methodName>` (in page object files)

Marks a method that is called from more than one spec or from more than one
location within a spec. This signals that the method should NOT be inlined
and must stay in the page object.

```js
// REUSE_METHOD: searchStudents
async searchStudents(searchText) { ... }
```

When parsing a codegen recording, apply this tag to any action sequence that
appears more than once, or that maps to an existing page-object method.

## Page object conventions

- Every page object extends `BasePage`.
- Constructor declares **all** locators as `this.xxx` properties.
- Action methods (`goto`, `click*`, `fill*`, `select*`) are `async`.
- Assertion methods are prefixed `expect` and call `this.expectVisible / expectHidden / expectText`.
- Composed sub-pages (navigation, footer, modals) are instantiated in the constructor and exposed as `this.navigation`, `this.footer`, etc.

```js
class AdminFooPage extends BasePage {
    constructor(page) {
        super(page);
        this.navigation = new AdminNavigationPage(page);
        this.someButton = page.getByRole('button', { name: 'Do Thing' }); // STEP locator
    }

    // REUSE_METHOD: clickDoThing
    async clickDoThing() {
        await this.someButton.click();
    }

    async expectSomethingVisible() {
        await this.expectVisible(this.someButton);
    }
}
module.exports = AdminFooPage;
```

## Adding a new flow from a codegen recording

1. **Run codegen** (user runs this; output is a raw recording):
   ```bash
   npx playwright codegen <url> --output k-automation-tests/<flow-name>.java
   ```

2. **Parse the recording** — for every recorded action, extract the locator
   using the priority order above and map it to either:
   - An existing page-object method → mark `// REUSE_METHOD`
   - A new page-object method → add to the relevant `XxxPage` class

3. **Write the spec** — number each action as `// STEP N:` and call the
   corresponding page-object method.

4. **Register the fixture** (if new page object) in `fixtures/fixtures.js`
   following the existing pattern.

5. **Export** the new page class from the relevant `pages/admin/index.js` or
   `pages/student/index.js`.

## Authentication

Tests authenticate through Playwright fixtures:
- `adminPage` → logs in as `users.admin`
- `studentPage` → logs in as `users.student`

Always use an authenticated fixture, not a bare `page` fixture, in specs.
