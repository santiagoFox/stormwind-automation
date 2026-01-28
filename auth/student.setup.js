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

    // Step 2: Enter password and login
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible' });
    await page.getByRole('textbox', { name: 'Password' }).fill(users.student.password);
    await page.getByRole('button', { name: 'Log in' }).click();

    // Wait for login to complete
    await page.waitForLoadState('networkidle');

    // Save storage state
    await page.context().storageState({ path: studentAuthFile });
});

module.exports = { studentAuthFile };
