const { test: setup } = require('@playwright/test');
const users = require('../data/users');
const URLS = require('../data/urls');

const studentAuthFile = 'auth/.auth/student.json';

setup('authenticate as student', async ({ page }) => {
    // Navigate to login page
    await page.goto(URLS.LOGIN);

    // Step 1: Enter email and click Enter
    await page.locator('#email-only').fill(users.student.email);
    await page.getByRole('button', { name: 'Enter' }).click();

    // Step 2: Wait for password field and enter password
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible', timeout: 30000 });
    await page.getByRole('textbox', { name: 'Password' }).fill(users.student.password);

    // Click Log in with force to bypass any overlay
    await page.getByRole('button', { name: 'Log in' }).click({ force: true });

    // Wait for navigation away from login page
    await page.waitForURL(/.*(?!.*login).*/, { timeout: 30000 });
    await page.waitForLoadState('load');

    // Save storage state
    await page.context().storageState({ path: studentAuthFile });
});

module.exports = { studentAuthFile };
