/**
 * One-time exploration script — find working admin/course URLs in Drupal
 * Run with: BASE_URL=https://drupal-8-9a-spectre.pantheonsite.io/ node explore-drupal.js
 */
const { chromium } = require('@playwright/test');

(async () => {
    const baseURL = process.env.BASE_URL || 'https://drupal-8-9a-spectre.pantheonsite.io/';
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // Login using the two-step flow
    console.log('Logging in...');
    await page.goto(baseURL + 'user/login');
    await page.waitForLoadState('load');
    // Step 1: Enter email
    await page.fill('#email-only', 'santiago+mobilestudentmanager@foxbox.com');
    await page.getByRole('button', { name: 'Enter' }).click();
    // Step 2: Wait for password field
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForLoadState('load');
    console.log('Logged in. Current URL:', page.url());

    // Check admin sub-pages
    const adminURLs = [
        '/admin/assessments',
        '/admin/courses',
        '/admin/manage-library',
        '/team/19126/reporting/145164',
    ];

    for (const url of adminURLs) {
        await page.goto(baseURL.replace(/\/$/, '') + url);
        await page.waitForLoadState('load');
        const title = await page.title();
        const h1 = await page.locator('h1').first().textContent().catch(() => 'N/A');
        console.log(`\n${url}`);
        console.log(`  title: ${title}`);
        console.log(`  h1: ${h1}`);
        console.log(`  url: ${page.url()}`);
    }

    // Browse courses page to find one with assign button
    console.log('\n\nBrowsing /topics for courses...');
    await page.goto(baseURL + 'topics');
    await page.waitForLoadState('load');

    // Get course links
    const courseLinks = await page.locator('a[href*="/"]').filter({ hasText: /.+/ }).all();
    const hrefs = [];
    for (const link of courseLinks.slice(0, 30)) {
        const href = await link.getAttribute('href');
        if (href && href.includes('/') && !href.includes('topics') && !href.includes('javascript') && !href.startsWith('#') && !href.includes('logout') && href.split('/').length >= 3) {
            hrefs.push(href);
        }
    }
    // Deduplicate
    const uniqueHrefs = [...new Set(hrefs)].slice(0, 10);
    console.log('Candidate course URLs:', uniqueHrefs);

    // Try each to find one with assign button
    for (const href of uniqueHrefs) {
        const url = href.startsWith('http') ? href : baseURL.replace(/\/$/, '') + href;
        try {
            await page.goto(url);
            await page.waitForLoadState('load');
            const hasAssignBtn = await page.locator('button.js-assign-course').isVisible().catch(() => false);
            if (hasAssignBtn) {
                console.log(`\nFOUND course with assign button: ${href}`);
                break;
            }
        } catch (e) {
            console.log(`  Error on ${href}: ${e.message}`);
        }
    }

    // Try the actual courses catalog URL
    console.log('\n\nChecking /topics page structure...');
    await page.goto(baseURL + 'topics');
    await page.waitForLoadState('load');
    // Get all course card links from catalog
    const catalogLinks = await page.locator('.course-card a, .course-item a, article a').all();
    console.log('Catalog link count:', catalogLinks.length);
    for (const link of catalogLinks.slice(0, 5)) {
        const href = await link.getAttribute('href');
        const text = await link.textContent().catch(() => '');
        console.log(`  ${text.trim().substring(0, 50)} → ${href}`);
    }

    await browser.close();
})();
