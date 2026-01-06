const { test, expect } = require('../../fixtures/fixtures');

test.describe('Admin - Due Dates Tests', () => {
    test.beforeEach(async ({ adminDueDates }) => {
        await adminDueDates.goto();
    });

    test('should display due dates page correctly', async ({ adminDueDates }) => {
        const isDisplayed = await adminDueDates.isDueDatesPageDisplayed();
        expect(isDisplayed).toBeTruthy();
    });

    test('should be on the correct due dates URL', async ({ adminDueDates }) => {
        const isCorrectURL = await adminDueDates.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
    });

    test('should display create due date button', async ({ adminDueDates }) => {
        await expect(adminDueDates.createDueDateButton).toBeVisible();
    });

    test('should allow filtering due dates', async ({ adminDueDates }) => {
        await adminDueDates.selectFilter('upcoming');
        // Add assertions based on filter results
    });

    test('should open create due date modal when create button is clicked', async ({ adminDueDates }) => {
        await adminDueDates.clickCreateDueDate();
        // Add assertions for modal display
    });

    test('should display due dates table', async ({ adminDueDates }) => {
        await expect(adminDueDates.dueDatesTable).toBeVisible();
    });
});
