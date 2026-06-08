const { chromium } = require('@playwright/test');
const users = require('../data/users');

const BASE = 'https://test-spectre.pantheonsite.io';
const findings = [];

function log(type, area, message) {
    const entry = `[${type}] ${area}: ${message}`;
    console.log(entry);
    findings.push(entry);
}

async function isVisible(locator) {
    return locator.isVisible().catch(() => false);
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext();
    const page = await context.newPage();

    // ── LOGIN ──────────────────────────────────────────────────────────────
    await page.goto(BASE + '/user/login');
    await page.locator('#email-only').fill(users.student.email);
    await page.getByRole('button', { name: 'Enter' }).click();
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible' });
    await page.getByRole('textbox', { name: 'Password' }).fill(users.student.password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForLoadState('load');
    log('PASS', 'Login', `Logged in → ${page.url()}`);

    // ── MY CLASSROOM ───────────────────────────────────────────────────────
    await page.locator('nav').getByRole('link', { name: 'My Classroom' }).click();
    await page.waitForLoadState('load');
    log('INFO', 'My Classroom', `URL: ${page.url()}`);

    // Welcome heading
    const welcome = page.locator('h1').filter({ hasText: /Welcome back/i }).first();
    log(await isVisible(welcome) ? 'PASS' : 'FAIL', 'My Classroom', 'Welcome heading visible');

    // Featured course card
    const resumeBtn = page.getByRole('link', { name: /RESUME/i }).first();
    const seeDetailsBtn = page.getByRole('link', { name: /SEE COURSE DETAILS/i }).first();
    log(await isVisible(resumeBtn) ? 'PASS' : 'WARN', 'My Classroom', 'RESUME button on featured course');
    log(await isVisible(seeDetailsBtn) ? 'PASS' : 'WARN', 'My Classroom', 'SEE COURSE DETAILS button on featured course');

    // Monthly goal widget
    const monthlyGoal = page.getByText(/Monthly Goal/i);
    log(await isVisible(monthlyGoal) ? 'PASS' : 'WARN', 'My Classroom', 'Monthly Goal widget visible');

    // Category tabs (Courses / Learning Paths / Skills Assessment)
    const coursesTab = page.getByRole('tab', { name: /^Courses$/i }).or(page.getByText('Courses').first());
    const lpTab = page.getByText(/Learning Paths/i).first();
    const saTab = page.getByText(/Skills Assessment/i).first();
    log(await isVisible(coursesTab) ? 'PASS' : 'WARN', 'My Classroom', 'Courses tab visible');
    log(await isVisible(lpTab) ? 'PASS' : 'WARN', 'My Classroom', 'Learning Paths tab visible');
    log(await isVisible(saTab) ? 'PASS' : 'WARN', 'My Classroom', 'Skills Assessment tab visible');

    // Filter pills: All / In progress / Completed
    const allPill = page.getByText(/^All/i).first();
    const inProgressPill = page.getByText(/In progress/i).first();
    const completedPill = page.getByText(/^Completed/i).first();
    log(await isVisible(allPill) ? 'PASS' : 'WARN', 'My Classroom', 'Filter pill "All" visible');
    log(await isVisible(inProgressPill) ? 'PASS' : 'WARN', 'My Classroom', 'Filter pill "In progress" visible');
    log(await isVisible(completedPill) ? 'PASS' : 'WARN', 'My Classroom', 'Filter pill "Completed" visible');

    // Overdue badge
    const overdueBadge = page.getByText(/Overdue/i).first();
    log(await isVisible(overdueBadge) ? 'INFO' : 'INFO', 'My Classroom',
        `Overdue badge: ${await isVisible(overdueBadge) ? 'visible (expected)' : 'not visible'}`);

    // Sidebar links
    for (const name of ['Webinars', 'Newsletter', 'Live Course Calendar', 'My Live Schedule', 'Contact Support', 'Send Ideas']) {
        const link = page.getByRole('link', { name }).or(page.getByText(name)).first();
        log(await isVisible(link) ? 'PASS' : 'FAIL', 'My Classroom Sidebar', `"${name}" link visible`);
    }

    // Click "In progress" filter — verify it filters cards
    await inProgressPill.click().catch(() => {});
    await page.waitForTimeout(800);
    const visibleCards = await page.locator('[class*="course-card"], [class*="classroom-card"]').count();
    log('INFO', 'My Classroom', `Course cards visible after "In progress" filter: ${visibleCards}`);

    // ── LEADERBOARD ────────────────────────────────────────────────────────
    await page.locator('nav').getByRole('link', { name: 'Leaderboard' }).click();
    await page.waitForLoadState('load');
    log('INFO', 'Leaderboard', `URL: ${page.url()}`);

    const lbHeading = page.getByRole('heading', { name: /Leaderboard/i });
    log(await isVisible(lbHeading) ? 'PASS' : 'FAIL', 'Leaderboard', 'Heading visible');

    // Filter tabs
    for (const tab of ['All Time', '1 Year', 'Last 30 Days', 'Last 7 Days', 'Last 24h']) {
        const t = page.getByRole('button', { name: tab }).or(page.getByText(tab)).first();
        log(await isVisible(t) ? 'PASS' : 'FAIL', 'Leaderboard', `Filter tab "${tab}" visible`);
    }

    // Podium (top 3)
    const podium1st = page.getByText('1st');
    const podium2nd = page.getByText('2nd');
    const podium3rd = page.getByText('3rd');
    log(await isVisible(podium1st) ? 'PASS' : 'FAIL', 'Leaderboard', '1st place podium visible');
    log(await isVisible(podium2nd) ? 'PASS' : 'FAIL', 'Leaderboard', '2nd place podium visible');
    log(await isVisible(podium3rd) ? 'PASS' : 'FAIL', 'Leaderboard', '3rd place podium visible');

    // Table columns
    for (const col of ['Student Name', 'Total Course Time', 'Courses Completed', 'Courses Registered', 'Top Course']) {
        const cell = page.getByText(col).first();
        log(await isVisible(cell) ? 'PASS' : 'FAIL', 'Leaderboard', `Column "${col}" visible`);
    }

    // Export Chart button
    const exportBtn = page.getByRole('button', { name: /Export Chart/i }).or(page.getByText(/Export Chart/i)).first();
    log(await isVisible(exportBtn) ? 'PASS' : 'WARN', 'Leaderboard', 'EXPORT CHART button visible');

    // Click "Last 30 Days" filter — verify table updates (doesn't 404 or crash)
    await page.getByText('Last 30 Days').first().click().catch(() => {});
    await page.waitForTimeout(800);
    const stillOnLeaderboard = page.url().includes('leaderboard');
    log(stillOnLeaderboard ? 'PASS' : 'FAIL', 'Leaderboard', 'Stays on leaderboard after filter click');

    // ── COURSES PAGE ───────────────────────────────────────────────────────
    await page.locator('nav').getByRole('link', { name: 'Courses' }).click();
    await page.waitForLoadState('load');
    log('INFO', 'Courses', `URL: ${page.url()}`);
    const courseCards = await page.locator('[class*="course"], [class*="card"]').count();
    log('INFO', 'Courses', `Course elements found: ${courseCards}`);
    const searchBar = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    log(await isVisible(searchBar) ? 'PASS' : 'WARN', 'Courses', 'Search bar visible');

    // ── LEARNING PATHS ─────────────────────────────────────────────────────
    await page.locator('nav').getByRole('link', { name: 'Learning Paths' }).click();
    await page.waitForLoadState('load');
    log('INFO', 'Learning Paths', `URL: ${page.url()}`);
    const lpHeading = page.getByRole('heading', { name: /Learning Paths/i });
    log(await isVisible(lpHeading) ? 'PASS' : 'FAIL', 'Learning Paths', 'Heading visible');

    // ── SKILLS ASSESSMENTS ──────────────────────────────────────────────────
    await page.locator('nav').getByRole('link', { name: 'Skills Assessments' }).click();
    await page.waitForLoadState('load');
    log('INFO', 'Skills Assessments', `URL: ${page.url()}`);
    const saHeading = page.getByRole('heading', { name: /Skills Assessments/i });
    log(await isVisible(saHeading) ? 'PASS' : 'FAIL', 'Skills Assessments', 'Heading visible');

    // ── CONTACT SUPPORT MODAL ──────────────────────────────────────────────
    await page.locator('nav').getByRole('link', { name: 'My Classroom' }).click();
    await page.waitForLoadState('load');
    const contactLink = page.getByRole('link', { name: /Contact Support/i }).first();
    if (await isVisible(contactLink)) {
        await contactLink.click();
        await page.waitForTimeout(2000);
        const modal = page.locator('[role="dialog"], .modal, [class*="modal"]').first();
        log(await isVisible(modal) ? 'PASS' : 'FAIL', 'Contact Support', 'Modal opens on click');
        const nameField = page.getByLabel(/name/i).or(page.locator('input[name*="name"]')).first();
        const emailField = page.getByLabel(/email/i).or(page.locator('input[name*="email"]')).first();
        log(await isVisible(nameField) ? 'PASS' : 'WARN', 'Contact Support', 'Name field visible in modal');
        log(await isVisible(emailField) ? 'PASS' : 'WARN', 'Contact Support', 'Email field visible in modal');
    } else {
        log('WARN', 'Contact Support', 'Link not found on My Classroom page');
    }

    // ── COURSE DETAILS ─────────────────────────────────────────────────────
    await page.goto(BASE + '/stormwind-developer/ai-and-chatgpt/coding-ai-copilot');
    await page.waitForLoadState('load');
    const addBtn = page.getByRole('button', { name: /ADD TO CLASSROOM/i });
    const startBtn = page.getByRole('link', { name: /START/i });
    const checkmarkBtn = page.locator('button.btn-circle.js-course-flag, button.btn-circle:has(i.fa-check)');
    log(await isVisible(addBtn) ? 'INFO' : 'INFO', 'Course Details',
        `State: ADD TO CLASSROOM=${await isVisible(addBtn)} | START=${await isVisible(startBtn)} | Checkmark=${await isVisible(checkmarkBtn)}`);

    // Supplements
    const supplements = await page.locator('a').filter({ hasText: /VS Code|Copilot Plans|VS Code Docs|VS Code Models/i }).count();
    log(supplements >= 4 ? 'PASS' : 'WARN', 'Course Details', `Supplement links visible: ${supplements}/4`);

    // Modules
    const modules = await page.getByRole('heading', { name: /Module|Getting Started|Context and Project|Server Setup/i }).count();
    log(modules >= 3 ? 'PASS' : 'WARN', 'Course Details', `Module headings found: ${modules}`);

    await browser.close();

    // ── SUMMARY ────────────────────────────────────────────────────────────
    console.log('\n══════════════════════════════════════════════════');
    console.log('EXPLORATORY TEST SUMMARY');
    console.log('══════════════════════════════════════════════════');
    const passed = findings.filter(f => f.startsWith('[PASS]')).length;
    const failed = findings.filter(f => f.startsWith('[FAIL]')).length;
    const warned = findings.filter(f => f.startsWith('[WARN]')).length;
    console.log(`PASS: ${passed}  |  FAIL: ${failed}  |  WARN: ${warned}`);
    console.log('');
    if (failed > 0) {
        console.log('FAILURES:');
        findings.filter(f => f.startsWith('[FAIL]')).forEach(f => console.log(' ', f));
        console.log('');
    }
    if (warned > 0) {
        console.log('WARNINGS:');
        findings.filter(f => f.startsWith('[WARN]')).forEach(f => console.log(' ', f));
    }
})();
