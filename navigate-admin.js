/**
 * Admin navigation tour — logs in as admin and visits all key pages,
 * capturing title, h1, current URL, and any prominent headings.
 *
 * Run: BASE_URL=https://drupal-8-9b-spectre.pantheonsite.io/ node navigate-admin.js
 */
const { chromium } = require('@playwright/test');
const fs = require('fs');
const path = require('path');

const BASE_URL = (process.env.BASE_URL || 'https://drupal-8-9b-spectre.pantheonsite.io/').replace(/\/$/, '');
const SCREENSHOT_DIR = path.join(__dirname, 'admin-tour-screenshots');

const ADMIN_PAGES = [
    { label: 'Dashboard',              path: '/team/19126/reporting/145164' },
    { label: 'Due Dates',              path: '/team/19126/due-date/145164' },
    { label: 'Add Users',              path: '/setup/team/145164/invitations?group=19126' },
    { label: 'Manage Learning Paths',  path: '/team/learning-path' },
    { label: 'Create Learning Path',   path: '/team/learning-path/create' },
    { label: 'Skills Assessments',     path: '/team/19126/skills-assessment/145164' },
    { label: 'Courses (admin)',        path: '/admin/courses' },
    { label: 'Assessments (admin)',    path: '/admin/assessments' },
    { label: 'Manage Library',         path: '/admin/manage-library' },
    { label: 'PL-300 Course Detail',   path: '/microsoft-it/microsoft-power-platform/pl-300-microsoft-power-bi-data-analyst' },
    { label: 'Topics / Course Catalog',path: '/topics' },
    { label: 'Student Dashboard',      path: '/student/dashboard' },
];

async function getPageInfo(page, label) {
    const title   = await page.title();
    const url     = page.url();
    const h1      = await page.locator('h1').first().textContent().catch(() => '—');
    const headings = await page.locator('h1, h2, h3').allTextContents().catch(() => []);
    const isLogin  = url.includes('/user/login') || (await page.locator('button[name="op"]').isVisible().catch(() => false));

    return { label, url, title, h1: h1?.trim(), headings: headings.map(h => h.trim()).filter(Boolean).slice(0, 6), isLogin };
}

(async () => {
    if (!fs.existsSync(SCREENSHOT_DIR)) fs.mkdirSync(SCREENSHOT_DIR);

    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();
    page.setDefaultTimeout(30000);

    // ── Login ──────────────────────────────────────────────────────────────
    console.log(`\nLogging in at ${BASE_URL}/user/login ...\n`);
    await page.goto(`${BASE_URL}/user/login`);
    await page.waitForLoadState('load');

    // Two-step login: email → Enter → password → Log in
    await page.locator('#email-only').fill('santiago+mobilestudentmanager@foxbox.com');
    await page.getByRole('button', { name: 'Enter' }).click();
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');

    // Wait for overlay to clear before clicking Log in
    await page.waitForFunction(() => {
        const overlay = document.querySelector('.min-vh-100.d-flex.flex-column.justify-content-center.align-items-start');
        if (!overlay) return true;
        const btn = document.querySelector('button[name="op"]');
        if (!btn) return true;
        const btnRect = btn.getBoundingClientRect();
        const topEl = document.elementFromPoint(btnRect.left + btnRect.width / 2, btnRect.top + btnRect.height / 2);
        return topEl === btn || btn.contains(topEl);
    }, {}, { timeout: 15000 }).catch(() => {});

    await page.getByRole('button', { name: 'Log in' }).click({ timeout: 20000 });
    await page.waitForLoadState('load');
    console.log(`  Logged in → ${page.url()}\n`);

    // ── Tour ───────────────────────────────────────────────────────────────
    const results = [];

    for (const { label, path: navPath } of ADMIN_PAGES) {
        await page.goto(`${BASE_URL}${navPath}`);
        await page.waitForLoadState('load');

        const info = await getPageInfo(page, label);
        const slug = label.replace(/[^a-z0-9]/gi, '-').toLowerCase();
        const screenshotPath = path.join(SCREENSHOT_DIR, `${slug}.png`);
        await page.screenshot({ path: screenshotPath, fullPage: false });

        results.push(info);

        const status = info.isLogin ? '🔒 REDIRECTED TO LOGIN' : '✓';
        console.log(`${status}  ${label}`);
        console.log(`     URL:      ${info.url}`);
        console.log(`     Title:    ${info.title}`);
        console.log(`     H1:       ${info.h1}`);
        if (info.headings.length) console.log(`     Headings: ${info.headings.join(' | ')}`);
        console.log();
    }

    // ── Summary ────────────────────────────────────────────────────────────
    console.log('─'.repeat(70));
    console.log('SUMMARY');
    console.log('─'.repeat(70));
    const ok      = results.filter(r => !r.isLogin);
    const blocked = results.filter(r => r.isLogin);
    console.log(`  Working:  ${ok.map(r => r.label).join(', ')}`);
    if (blocked.length) console.log(`  Blocked:  ${blocked.map(r => r.label).join(', ')}`);
    console.log(`\nScreenshots saved to: ${SCREENSHOT_DIR}/`);

    await browser.close();
})();
