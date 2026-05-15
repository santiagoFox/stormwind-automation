/**
 * Check admin My Classroom server error + sidebar links on other pages
 */
const { chromium } = require('@playwright/test');
const path = require('path');
const fs = require('fs');

const BASE_URL = (process.env.BASE_URL || 'https://drupal-8-9b-spectre.pantheonsite.io/').replace(/\/$/, '');
const DIR = path.join(__dirname, 'admin-tour-screenshots');
if (!fs.existsSync(DIR)) fs.mkdirSync(DIR);

async function login(page, email) {
    await page.goto(`${BASE_URL}/user/login`);
    await page.waitForLoadState('load');
    await page.locator('#email-only').fill(email);
    await page.getByRole('button', { name: 'Enter' }).click();
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click({ noWaitAfter: true });
    await page.waitForURL(url => !url.toString().includes('/user/login'), { timeout: 30000 });
    await page.waitForLoadState('load');
}

async function checkSidebar(page, pageLabel, screenshotName) {
    // Wait up to 5s for sidebar links to appear
    await page.waitForTimeout(2000);

    const sidebarSelectors = [
        '/webinar', '/calendar', 'newsletter', 'feedback', 'contact', 'ideas'
    ];

    // Collect all links
    const allLinks = await page.locator('a').all();
    const found = [];
    for (const link of allLinks) {
        const text = (await link.textContent().catch(() => '')).trim().replace(/\s+/g, ' ');
        const href = await link.getAttribute('href').catch(() => '') || '';
        const isVisible = await link.isVisible().catch(() => false);
        if (isVisible && text && sidebarSelectors.some(s => href.includes(s) || text.toLowerCase().includes(s))) {
            found.push({ text, href });
        }
    }

    const errorText = await page.locator('body').textContent().then(t => t.includes('unexpected error') ? '500 SERVER ERROR' : 'ok').catch(() => '?');

    await page.screenshot({ path: path.join(DIR, `${screenshotName}.png`) });

    console.log(`\n[${pageLabel}]`);
    console.log(`  URL:    ${page.url()}`);
    console.log(`  Status: ${errorText}`);
    console.log(`  Sidebar links found: ${found.length ? found.map(l => `"${l.text}" → ${l.href}`).join(', ') : 'none'}`);
}

(async () => {
    const browser = await chromium.launch({ headless: true });

    // ── Admin ──────────────────────────────────────────────────────────────
    console.log('\n═══ ADMIN ═══');
    const adminCtx  = await browser.newContext();
    const adminPage = await adminCtx.newPage();
    await login(adminPage, 'santiago+mobilestudentmanager@foxbox.com');
    console.log('Logged in →', adminPage.url());

    // Check My Classroom
    await adminPage.getByRole('link', { name: 'My Classroom' }).click();
    await adminPage.waitForLoadState('load');
    await checkSidebar(adminPage, 'Admin → My Classroom', 'admin-my-classroom-full');

    // Check admin Dashboard (does sidebar appear here?)
    await adminPage.goto(`${BASE_URL}/team/19126/reporting/145164`);
    await adminPage.waitForLoadState('load');
    await checkSidebar(adminPage, 'Admin → Dashboard', 'admin-dashboard-sidebar');

    // Check Topics/Courses page
    await adminPage.getByRole('link', { name: 'Courses' }).first().click();
    await adminPage.waitForLoadState('load');
    await checkSidebar(adminPage, 'Admin → Courses (/topics)', 'admin-courses-sidebar');

    await adminCtx.close();

    // ── Student ────────────────────────────────────────────────────────────
    console.log('\n═══ STUDENT ═══');
    const studentCtx  = await browser.newContext();
    const studentPage = await studentCtx.newPage();
    await login(studentPage, 'santiago+mobilestudent@foxbox.com');
    console.log('Logged in →', studentPage.url());

    await studentPage.waitForLoadState('load');
    await checkSidebar(studentPage, 'Student → My Classroom (post-login)', 'student-my-classroom-sidebar');

    await studentCtx.close();
    await browser.close();
})();
