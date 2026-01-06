const { test, expect } = require('../../fixtures/fixtures');

test.describe('Admin - Dashboard Tests', () => {
    test('should display admin dashboard correctly', async ({ adminDashboard }) => {
        const isDisplayed = await adminDashboard.isDashboardDisplayed();
        expect(isDisplayed).toBeTruthy();
    });

    test('should be on the correct dashboard URL', async ({ adminDashboard }) => {
        const isCorrectURL = await adminDashboard.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
    });

    test('should navigate to Courses page', async ({ adminDashboard, adminPage }) => {
        await adminDashboard.navigateToCourses();
        expect(adminPage.url()).toContain('courses');
    });

    test('should navigate to Due Dates page', async ({ adminDashboard, adminPage }) => {
        await adminDashboard.navigateToDueDates();
        expect(adminPage.url()).toContain('due-dates');
    });

    test('should navigate to Assessments page', async ({ adminDashboard, adminPage }) => {
        await adminDashboard.navigateToAssessments();
        expect(adminPage.url()).toContain('assessments');
    });

    test('should navigate to Manage Library page', async ({ adminDashboard, adminPage }) => {
        await adminDashboard.navigateToManageLibrary();
        expect(adminPage.url()).toContain('manage-library');
    });

    test('should display statistics cards', async ({ adminDashboard }) => {
        const statsCardsCount = await adminDashboard.getStatsCardsCount();
        expect(statsCardsCount).toBeGreaterThan(0);
    });
});
