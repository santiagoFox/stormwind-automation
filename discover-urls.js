/**
 * URL discovery script — clicks through every nav link for admin and student,
 * recording the real landed URL, title, and key headings.
 *
 * Run: BASE_URL=https://drupal-8-9b-spectre.pantheonsite.io/ node discover-urls.js
 */
const { chromium } = require('@playwright/test');

const BASE_URL = (process.env.BASE_URL || 'https://drupal-8-9b-spectre.pantheonsite.io/').replace(/\/$/, '');

async function login(page, email) {
    await page.goto(`${BASE_URL}/user/login`);
    await page.waitForLoadState('load');
    await page.locator('#email-only').fill(email);
    await page.getByRole('button', { name: 'Enter' }).click();
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible', timeout: 10000 });
    await page.getByRole('textbox', { name: 'Password' }).fill('123456');
    // Wait for overlay before clicking
    await page.waitForFunction(() => {
        const btn = document.querySelector('button[name="op"]');
        if (!btn) return false;
        const r = btn.getBoundingClientRect();
        const top = document.elementFromPoint(r.left + r.width / 2, r.top + r.height / 2);
        return top === btn || btn.contains(top);
    }, {}, { timeout: 15000 }).catch(() => {});
    await page.getByRole('button', { name: 'Log in' }).click({ timeout: 20000, noWaitAfter: true });
    await page.waitForURL(url => !url.toString().includes('/user/login'), { timeout: 30000 });
    await page.waitForLoadState('load');
}

async function snap(page, label) {
    await page.waitForLoadState('load');
    const url     = page.url();
    const title   = await page.title();
    const h1      = await page.locator('h1').first().textContent().catch(() => '').then(t => t.trim());
    const path    = url.replace(BASE_URL, '') || '/';
    return { label, path, url, title, h1 };
}

async function printRow(info) {
    const is404 = info.title.includes('Page Not Found') || info.title.includes('404');
    const flag  = is404 ? ' ✘ 404' : ' ✓';
    console.log(`${flag}  [${info.label}]`);
    console.log(`      path:  ${info.path}`);
    console.log(`      title: ${info.title}`);
    if (info.h1 && info.h1 !== info.title.split('|')[0].trim()) console.log(`      h1:    ${info.h1}`);
    console.log();
    return info;
}

// ─── Admin tour ────────────────────────────────────────────────────────────────
async function adminTour(browser) {
    const ctx  = await browser.newContext();
    const page = await ctx.newPage();
    page.setDefaultTimeout(20000);

    console.log('\n' + '═'.repeat(70));
    console.log('ADMIN (santiago+mobilestudentmanager@foxbox.com)');
    console.log('═'.repeat(70) + '\n');

    await login(page, 'santiago+mobilestudentmanager@foxbox.com');
    console.log(`  Post-login → ${page.url()}\n`);

    const results = [];

    // ── Main nav links ──────────────────────────────────────────────────────
    console.log('── Main navigation ────────────────────────────────────────────\n');

    const mainNavLinks = [
        { label: 'My Classroom',       locator: () => page.getByRole('link', { name: 'My Classroom' }) },
        { label: 'Courses',            locator: () => page.getByRole('link', { name: 'Courses' }).first() },
        { label: 'Learning Paths',     locator: () => page.getByRole('link', { name: 'Learning Paths' }).first() },
        { label: 'Skills Assessments', locator: () => page.getByRole('link', { name: /skills?\s*assessments/i }).first() },
        { label: 'Leaderboard',        locator: () => page.getByRole('link', { name: 'Leaderboard' }) },
    ];

    // Start from Dashboard so admin sub-nav is present
    await page.goto(`${BASE_URL}/team/19126/reporting/145164`);
    await page.waitForLoadState('load');

    for (const { label, locator } of mainNavLinks) {
        try {
            await locator().click();
            results.push(await printRow(await snap(page, label)));
            // Go back to dashboard to restore admin sub-nav
            await page.goto(`${BASE_URL}/team/19126/reporting/145164`);
            await page.waitForLoadState('load');
        } catch (e) {
            console.log(`  ERROR  [${label}]: ${e.message.split('\n')[0]}\n`);
        }
    }

    // ── Admin sub-nav tabs ──────────────────────────────────────────────────
    console.log('── Admin sub-navigation (tab bar) ────────────────────────────\n');

    const subNavTabs = [
        'Dashboard',
        'Skills Assessments Data',
        'Due Dates',
        'Add Users',
        'Manage Learning Paths',
    ];

    await page.goto(`${BASE_URL}/team/19126/reporting/145164`);
    await page.waitForLoadState('load');

    for (const tabName of subNavTabs) {
        try {
            const tab = page.locator('#admin-shortcuts a').filter({ hasText: tabName });
            const href = await tab.getAttribute('href').catch(() => null);
            await tab.click();
            const info = await snap(page, `Admin tab: ${tabName}`);
            info.href = href;
            results.push(await printRow(info));
        } catch (e) {
            console.log(`  ERROR  [${tabName}]: ${e.message.split('\n')[0]}\n`);
        }
    }

    // ── Sidebar links (visible when on student-facing pages) ────────────────
    console.log('── Sidebar links (from My Classroom) ─────────────────────────\n');

    const sidebarLinks = [
        { label: 'Sidebar: Webinars',            name: /webinars/i },
        { label: 'Sidebar: Newsletter',           name: /newsletter/i },
        { label: 'Sidebar: Live Course Calendar', name: /live course calendar/i },
        { label: 'Sidebar: Send Ideas',           name: /send ideas/i },
    ];

    for (const { label, name } of sidebarLinks) {
        try {
            await page.goto(`${BASE_URL}/team/19126/reporting/145164`);
            await page.waitForLoadState('load');
            // Navigate to My Classroom first to expose sidebar
            await page.getByRole('link', { name: 'My Classroom' }).click();
            await page.waitForLoadState('load');
            const link = page.getByRole('link', { name }).first();
            const [newPage] = await Promise.all([
                ctx.waitForEvent('page').catch(() => null),
                link.click(),
            ]);
            if (newPage) {
                await newPage.waitForLoadState('load');
                const info = await snap(newPage, label);
                results.push(await printRow(info));
                await newPage.close();
            } else {
                results.push(await printRow(await snap(page, label)));
            }
        } catch (e) {
            console.log(`  ERROR  [${label}]: ${e.message.split('\n')[0]}\n`);
        }
    }

    // ── Deeper: click into first course card ────────────────────────────────
    console.log('── Deeper navigation ─────────────────────────────────────────\n');

    try {
        await page.goto(`${BASE_URL}/topics`);
        await page.waitForLoadState('load');
        // Click first topic category
        const firstCategory = page.locator('.topic-card a, .category-card a, article a').first();
        const catHref = await firstCategory.getAttribute('href').catch(() => null);
        if (catHref) {
            await firstCategory.click();
            await page.waitForLoadState('load');
            results.push(await printRow(await snap(page, `Topics → first category (${catHref})`)));

            // Click first course in that category
            const firstCourse = page.locator('.course-card a, .course-item a, article a').first();
            const courseHref = await firstCourse.getAttribute('href').catch(() => null);
            if (courseHref) {
                await firstCourse.click();
                await page.waitForLoadState('load');
                results.push(await printRow(await snap(page, `Course detail (${courseHref})`)));
            }
        }
    } catch (e) {
        console.log(`  ERROR  [deeper nav]: ${e.message.split('\n')[0]}\n`);
    }

    // Learning path detail
    try {
        await page.goto(`${BASE_URL}/team/learning-path`);
        await page.waitForLoadState('load');
        const firstLP = page.locator('a').filter({ hasText: /view|edit|manage/i }).first();
        const lpHref = await firstLP.getAttribute('href').catch(() => null);
        if (lpHref) {
            await firstLP.click();
            await page.waitForLoadState('load');
            results.push(await printRow(await snap(page, `Learning Path detail (${lpHref})`)));
        }
    } catch (e) {
        console.log(`  ERROR  [LP detail]: ${e.message.split('\n')[0]}\n`);
    }

    await ctx.close();
    return results;
}

// ─── Student tour ──────────────────────────────────────────────────────────────
async function studentTour(browser) {
    const ctx  = await browser.newContext();
    const page = await ctx.newPage();
    page.setDefaultTimeout(20000);

    console.log('\n' + '═'.repeat(70));
    console.log('STUDENT (santiago+mobilestudent@foxbox.com)');
    console.log('═'.repeat(70) + '\n');

    await login(page, 'santiago+mobilestudent@foxbox.com');
    console.log(`  Post-login → ${page.url()}\n`);

    const results = [];

    // ── Main nav ────────────────────────────────────────────────────────────
    console.log('── Main navigation ────────────────────────────────────────────\n');

    const mainNavLinks = [
        { label: 'My Classroom',       locator: () => page.getByRole('link', { name: 'My Classroom' }) },
        { label: 'Courses',            locator: () => page.getByRole('link', { name: 'Courses' }).first() },
        { label: 'Learning Paths',     locator: () => page.getByRole('link', { name: 'Learning Paths' }).first() },
        { label: 'Skills Assessments', locator: () => page.getByRole('link', { name: /skills?\s*assessments/i }).first() },
        { label: 'Leaderboard',        locator: () => page.getByRole('link', { name: 'Leaderboard' }) },
    ];

    // Start from post-login page
    const startUrl = page.url();

    for (const { label, locator } of mainNavLinks) {
        try {
            await page.goto(startUrl);
            await page.waitForLoadState('load');
            await locator().click();
            results.push(await printRow(await snap(page, label)));
        } catch (e) {
            console.log(`  ERROR  [${label}]: ${e.message.split('\n')[0]}\n`);
        }
    }

    // ── Sidebar links ────────────────────────────────────────────────────────
    console.log('── Sidebar links ──────────────────────────────────────────────\n');

    const sidebarLinks = [
        { label: 'Sidebar: Webinars',            name: /webinars/i,              newTab: true },
        { label: 'Sidebar: Newsletter',           name: /newsletter/i,            newTab: true },
        { label: 'Sidebar: Live Course Calendar', name: /live course calendar/i,  newTab: true },
        { label: 'Sidebar: Contact Support',      name: /contact support/i,       newTab: false },
        { label: 'Sidebar: Send Ideas',           name: /send ideas/i,            newTab: true },
        { label: 'Sidebar: My Live Schedule',     name: /my live schedule/i,      newTab: false },
    ];

    for (const { label, name, newTab } of sidebarLinks) {
        try {
            await page.goto(startUrl);
            await page.waitForLoadState('load');
            const link = page.getByRole('link', { name }).first();
            if (newTab) {
                const [newPage] = await Promise.all([
                    ctx.waitForEvent('page').catch(() => null),
                    link.click(),
                ]);
                if (newPage) {
                    await newPage.waitForLoadState('load');
                    const info = await snap(newPage, label);
                    results.push(await printRow(info));
                    await newPage.close();
                } else {
                    results.push(await printRow(await snap(page, label)));
                }
            } else {
                await link.click();
                await page.waitForTimeout(1000);
                results.push(await printRow(await snap(page, label)));
            }
        } catch (e) {
            console.log(`  ERROR  [${label}]: ${e.message.split('\n')[0]}\n`);
        }
    }

    // ── Deeper: first course ─────────────────────────────────────────────────
    console.log('── Deeper navigation ─────────────────────────────────────────\n');

    try {
        await page.getByRole('link', { name: 'Courses' }).first().click();
        await page.waitForLoadState('load');
        results.push(await printRow(await snap(page, 'Courses catalog')));

        // Click first course card
        const firstCourse = page.locator('.course-card a, article a').first();
        const courseHref = await firstCourse.getAttribute('href').catch(() => null);
        if (courseHref) {
            await firstCourse.click();
            await page.waitForLoadState('load');
            results.push(await printRow(await snap(page, `Course detail (${courseHref})`)));

            // Check for Resume/Start/Add to Classroom button
            const actionBtn = await Promise.race([
                page.getByRole('link', { name: /resume/i }).isVisible().catch(() => false),
                page.getByRole('link', { name: /start/i }).isVisible().catch(() => false),
            ]);

            // Try clicking Resume if present
            const resumeLink = page.getByRole('link', { name: /resume/i });
            if (await resumeLink.isVisible().catch(() => false)) {
                await resumeLink.click();
                await page.waitForLoadState('load');
                results.push(await printRow(await snap(page, 'Course lessons (via Resume)')));
            }
        }
    } catch (e) {
        console.log(`  ERROR  [deeper nav]: ${e.message.split('\n')[0]}\n`);
    }

    // Learning path detail
    try {
        await page.getByRole('link', { name: 'Learning Paths' }).first().click();
        await page.waitForLoadState('load');
        const firstLP = page.locator('.learning-path-card a, article a').first();
        const lpHref = await firstLP.getAttribute('href').catch(() => null);
        if (lpHref) {
            await firstLP.click();
            await page.waitForLoadState('load');
            results.push(await printRow(await snap(page, `Learning Path detail (${lpHref})`)));
        }
    } catch (e) {
        console.log(`  ERROR  [LP detail]: ${e.message.split('\n')[0]}\n`);
    }

    await ctx.close();
    return results;
}

// ─── Main ──────────────────────────────────────────────────────────────────────
(async () => {
    const browser = await chromium.launch({ headless: true });

    const adminResults  = await adminTour(browser);
    const studentResults = await studentTour(browser);

    // ── Final URL map ──────────────────────────────────────────────────────
    const all = [...adminResults, ...studentResults];
    const unique = [...new Map(all.map(r => [r.path, r])).values()];

    console.log('\n' + '═'.repeat(70));
    console.log('ALL DISCOVERED PATHS');
    console.log('═'.repeat(70));
    unique.forEach(r => {
        const flag = (r.title.includes('Page Not Found') || r.title.includes('404')) ? ' 404' : '  ok';
        console.log(`${flag}  ${r.path.padEnd(60)} ${r.title.split('|')[0].trim()}`);
    });

    await browser.close();
})();
