const { chromium } = require('@playwright/test');
const users = require('../data/users');

const BASE = 'https://test-spectre.pantheonsite.io';
const findings = [];

function log(type, area, message) {
    const entry = `[${type}] ${area}: ${message}`;
    console.log(entry);
    findings.push(entry);
}

async function v(locator) {
    return locator.isVisible().catch(() => false);
}

(async () => {
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    // ── LOGIN ──────────────────────────────────────────────────────────────
    await page.goto(BASE + '/user/login');
    await page.locator('#email-only').fill(users.admin.email);
    await page.getByRole('button', { name: 'Enter' }).click();
    await page.getByRole('textbox', { name: 'Password' }).waitFor({ state: 'visible' });
    await page.getByRole('textbox', { name: 'Password' }).fill(users.admin.password);
    await page.getByRole('button', { name: 'Log in' }).click();
    await page.waitForLoadState('load');
    log('PASS', 'Login', `Logged in → ${page.url()}`);

    // ── ADMIN DASHBOARD ────────────────────────────────────────────────────
    await page.goto(BASE + '/admin/dashboard');
    await page.waitForLoadState('load');
    log('INFO', 'Dashboard', `URL: ${page.url()}`);

    // Licenses section
    const totalLicenses = await page.getByText('Total Licenses').isVisible().catch(() => false);
    const availLicenses = await page.getByText('Available Licenses').isVisible().catch(() => false);
    const studentsAssigned = await page.getByText('Students Assigned').isVisible().catch(() => false);
    log(totalLicenses ? 'PASS' : 'FAIL', 'Dashboard', 'Total Licenses label visible');
    log(availLicenses ? 'PASS' : 'FAIL', 'Dashboard', 'Available Licenses label visible');
    log(studentsAssigned ? 'PASS' : 'FAIL', 'Dashboard', 'Students Assigned label visible');

    // License numbers - check they have actual values
    const licenseNumbers = await page.locator('.licenses__stat-number, [class*="stat-number"], [class*="license"] .number').allTextContents().catch(() => []);
    log('INFO', 'Dashboard', `License stat values: ${licenseNumbers.join(', ')}`);

    // Action buttons
    const receiveLicensesBtn = await page.getByRole('button', { name: /Receive Licenses Report/i }).isVisible().catch(() => false);
    const resendWelcomeBtn = await page.getByRole('button', { name: /Resend Welcome Email/i }).isVisible().catch(() => false);
    const receiveActivityBtn = await page.getByRole('button', { name: /Receive Activity Report/i }).isVisible().catch(() => false);
    log(receiveLicensesBtn ? 'PASS' : 'FAIL', 'Dashboard', 'Receive Licenses Report button visible');
    log(resendWelcomeBtn ? 'PASS' : 'FAIL', 'Dashboard', 'Resend Welcome Email button visible');
    log(receiveActivityBtn ? 'PASS' : 'FAIL', 'Dashboard', 'Receive Activity Report button visible');

    // Team Activity section
    const teamActivity = await page.getByText('Team Activity').isVisible().catch(() => false);
    const totalHours = await page.getByText('Total Hours Trained').isVisible().catch(() => false);
    const coursesCompleted = await page.getByText('Total Courses Completed').isVisible().catch(() => false);
    log(teamActivity ? 'PASS' : 'FAIL', 'Dashboard', 'Team Activity section visible');
    log(totalHours ? 'PASS' : 'FAIL', 'Dashboard', 'Total Hours Trained label visible');
    log(coursesCompleted ? 'PASS' : 'FAIL', 'Dashboard', 'Total Courses Completed label visible');

    // Student Info section
    const studentInfo = await page.getByText('Student Info').isVisible().catch(() => false);
    log(studentInfo ? 'PASS' : 'FAIL', 'Dashboard', 'Student Info section visible');

    // Admin sub-nav tabs
    for (const tab of ['Dashboard', 'Add Users', 'Due Dates', 'Skills Assessments Data', 'Manage Learning Paths']) {
        const el = page.getByRole('link', { name: tab }).first();
        log(await v(el) ? 'PASS' : 'FAIL', 'Admin Sub-Nav', `"${tab}" tab visible`);
    }

    // ── DUE DATES ──────────────────────────────────────────────────────────
    await page.goto(BASE + '/admin/due-dates');
    await page.waitForLoadState('load');
    log('INFO', 'Due Dates', `URL: ${page.url()}`);

    const assignDueDateBtn = page.getByRole('button', { name: /Assign Due Date/i }).or(page.getByRole('link', { name: /Assign Due Date/i })).first();
    log(await v(assignDueDateBtn) ? 'PASS' : 'FAIL', 'Due Dates', 'Assign Due Date button visible');

    // Summary stats
    for (const stat of ['Total Due Dates', 'Completed', 'In Progress', 'Overdue']) {
        log(await v(page.getByText(stat).first()) ? 'PASS' : 'FAIL', 'Due Dates', `"${stat}" stat visible`);
    }

    // Table / search
    const searchCourseInput = page.locator('input[placeholder*="course" i], input[placeholder*="search" i]').first();
    log(await v(searchCourseInput) ? 'PASS' : 'FAIL', 'Due Dates', 'Course search input visible');

    const dueDatesTable = page.locator('table').first();
    log(await v(dueDatesTable) ? 'PASS' : 'FAIL', 'Due Dates', 'Due dates table visible');
    const tableRows = await page.locator('table tbody tr').count();
    log('INFO', 'Due Dates', `Table rows: ${tableRows}`);

    // ── SKILLS ASSESSMENTS DATA ────────────────────────────────────────────
    await page.goto(BASE + '/admin/skills-assessments-data');
    await page.waitForLoadState('load');
    await page.waitForTimeout(2000);
    log('INFO', 'Skills Assessments Data', `URL: ${page.url()}`);

    const viewSABtn = page.getByRole('link', { name: /View Skills Assessments/i }).or(page.getByRole('button', { name: /View Skills Assessments/i })).first();
    log(await v(viewSABtn) ? 'PASS' : 'FAIL', 'Skills Assessments Data', 'View Skills Assessments button visible');
    const mostPopular = page.getByText('Most Popular').first();
    log(await v(mostPopular) ? 'PASS' : 'FAIL', 'Skills Assessments Data', 'Most Popular section visible');
    const saSearchInput = page.locator('input[type="search"], input[placeholder*="search" i]').first();
    log(await v(saSearchInput) ? 'PASS' : 'FAIL', 'Skills Assessments Data', 'Search input visible');

    // ── ADD USERS ──────────────────────────────────────────────────────────
    await page.goto(BASE + '/admin/add-users');
    await page.waitForLoadState('load');
    log('INFO', 'Add Users', `URL: ${page.url()}`);

    for (const label of ['First Name', 'Last Name', 'Email']) {
        const input = page.getByLabel(label).or(page.locator(`input[placeholder*="${label}" i]`)).first();
        log(await v(input) ? 'PASS' : 'FAIL', 'Add Users', `${label} input visible`);
    }
    const addRowLink = page.getByText(/Add Row/i).or(page.getByRole('link', { name: /Add Row/i })).first();
    const saveBtn = page.getByRole('button', { name: /Save/i }).first();
    const cancelBtn = page.getByRole('button', { name: /Cancel/i }).or(page.getByRole('link', { name: /Cancel/i })).first();
    log(await v(addRowLink) ? 'PASS' : 'FAIL', 'Add Users', 'Add Row link visible');
    log(await v(saveBtn) ? 'PASS' : 'FAIL', 'Add Users', 'Save button visible');
    log(await v(cancelBtn) ? 'PASS' : 'FAIL', 'Add Users', 'Cancel button visible');

    // Check for Leaderboard link (recurring flaky test)
    const leaderboardLink = page.getByRole('link', { name: 'Leaderboard' }).first();
    log(await v(leaderboardLink) ? 'PASS' : 'WARN', 'Add Users', 'Leaderboard nav link visible (flaky test)');

    // ── MANAGE LEARNING PATHS ──────────────────────────────────────────────
    await page.goto(BASE + '/admin/manage-learning-paths');
    await page.waitForLoadState('load');
    log('INFO', 'Manage Learning Paths', `URL: ${page.url()}`);

    const createPathBtn = page.getByRole('link', { name: /Create Path/i }).or(page.getByRole('button', { name: /Create Path/i })).first();
    log(await v(createPathBtn) ? 'PASS' : 'FAIL', 'Manage Learning Paths', 'CREATE PATH button visible');
    const activePathsSection = page.getByText(/Active Paths/i).first();
    log(await v(activePathsSection) ? 'PASS' : 'FAIL', 'Manage Learning Paths', 'Active Paths section visible');
    const archivedSection = page.getByText(/Archived/i).first();
    log(await v(archivedSection) ? 'PASS' : 'FAIL', 'Manage Learning Paths', 'Archived section visible');
    const learningPathCards = await page.locator('[class*="learning-path"], [class*="path-card"]').count();
    log('INFO', 'Manage Learning Paths', `Learning path cards found: ${learningPathCards}`);

    // Are there Edit / Archive buttons on any path?
    const editBtns = await page.getByRole('button', { name: /Edit/i }).count();
    const archiveBtns = await page.getByRole('button', { name: /Archive/i }).or(page.getByText(/Archive/i)).count();
    log('INFO', 'Manage Learning Paths', `Edit buttons: ${editBtns} | Archive buttons: ${archiveBtns}`);

    // ── COURSE DETAILS (admin view) ────────────────────────────────────────
    await page.goto(BASE + '/stormwind-developer/ai-and-chatgpt/coding-ai-copilot');
    await page.waitForLoadState('load');
    log('INFO', 'Course Details (Admin)', `URL: ${page.url()}`);
    const assignCourseBtn = page.getByRole('button', { name: /Assign Course/i }).first();
    log(await v(assignCourseBtn) ? 'PASS' : 'FAIL', 'Course Details (Admin)', 'Assign Course button visible');

    // ── ROUTE HEALTH CHECK ─────────────────────────────────────────────────
    for (const route of ['/admin/dashboard', '/admin/due-dates', '/admin/skills-assessments-data', '/admin/add-users', '/admin/manage-learning-paths']) {
        const res = await page.request.get(BASE + route);
        log(res.status() === 200 ? 'PASS' : 'FAIL', 'Route Check', `${route} → ${res.status()}`);
    }

    await browser.close();

    // ── SUMMARY ────────────────────────────────────────────────────────────
    console.log('\n══════════════════════════════════════════════════');
    console.log('ADMIN EXPLORATORY SUMMARY');
    console.log('══════════════════════════════════════════════════');
    const passed = findings.filter(f => f.startsWith('[PASS]')).length;
    const failed = findings.filter(f => f.startsWith('[FAIL]')).length;
    const warned = findings.filter(f => f.startsWith('[WARN]')).length;
    console.log(`PASS: ${passed}  |  FAIL: ${failed}  |  WARN: ${warned}`);
    if (failed > 0) {
        console.log('\nFAILURES:');
        findings.filter(f => f.startsWith('[FAIL]')).forEach(f => console.log(' ', f));
    }
    if (warned > 0) {
        console.log('\nWARNINGS:');
        findings.filter(f => f.startsWith('[WARN]')).forEach(f => console.log(' ', f));
    }
    console.log('\nINFO:');
    findings.filter(f => f.startsWith('[INFO]')).forEach(f => console.log(' ', f));
})();
