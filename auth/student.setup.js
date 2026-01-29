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

    // Click Log in
    await page.getByRole('button', { name: 'Log in' }).click();

    // Wait for successful login - look for My Classroom link which only appears when logged in
    await page.getByRole('link', { name: 'My Classroom' }).waitFor({ state: 'visible', timeout: 30000 });

    // Debug: Log cookies after successful login
    const cookies = await page.context().cookies();
    console.log('Cookies after login:', cookies.map(c => `${c.name} (httpOnly: ${c.httpOnly})`));

    // Save storage state
    await page.context().storageState({ path: studentAuthFile });
});

module.exports = { studentAuthFile };
