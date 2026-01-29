const { test: setup } = require('@playwright/test');
const users = require('../data/users');
const URLS = require('../data/urls');

const adminAuthFile = 'auth/.auth/admin.json';

setup('authenticate as admin', async ({ page }) => {
    // Navigate to login page
    await page.goto(URLS.LOGIN);

    // Step 1: Enter email and click Enter
    await page.locator('#email-only').fill(users.admin.email);
    await page.getByRole('button', { name: 'Enter' }).click();

    // Step 2: Wait for password field and enter password
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible', timeout: 30000 });
    await page.getByRole('textbox', { name: 'Password' }).fill(users.admin.password);

    // Click Log in with force to bypass any overlay
    await page.getByRole('button', { name: 'Log in' }).click({ force: true });

    // Wait for navigation away from login page
    await page.waitForURL(/.*(?!.*login).*/, { timeout: 30000 });
    await page.waitForLoadState('load');

    // Save storage state
    await page.context().storageState({ path: adminAuthFile });
});

module.exports = { adminAuthFile };
