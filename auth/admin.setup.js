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

    // Step 2: Enter password and login
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible' });
    await page.getByRole('textbox', { name: 'Password' }).fill(users.admin.password);
    await page.getByRole('button', { name: 'Log in' }).click();

    // Wait for login to complete - wait for dashboard or redirect
    await page.waitForLoadState('networkidle');

    // Save storage state
    await page.context().storageState({ path: adminAuthFile });
});

module.exports = { adminAuthFile };
