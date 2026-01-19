const { test, expect } = require('../../fixtures/fixtures');

/**
 * Admin - Due Dates Page Tests
 * Tests the Due Dates page metadata (labels, buttons, sections)
 * URL: /team/{teamId}/due-date/{userId}
 * Note: Does NOT validate numeric values (counts, percentages) as they vary
 */
test.describe('Admin - Due Dates Page', () => {

    test('should validate complete due dates page metadata', async ({ adminDueDates }) => {
        // 1. Navigate to Due Dates page
        await adminDueDates.goto();

        // 2. Validate we're on the correct URL
        const isCorrectURL = await adminDueDates.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();

        // 3. Validate navigation is visible
        await adminDueDates.expectNavigationVisible();

        // 4. Validate admin sub-navigation is visible
        await adminDueDates.expectAdminSubNavVisible();

        // 5. Validate page title is visible
        await adminDueDates.expectPageTitleVisible();

        // 6. Validate summary section metadata
        // - Total due dates label
        // - Completed label
        // - In Progress label
        // - Overdue label
        // - Search for a course input
        // - ASSIGN A DUE DATE button
        await adminDueDates.expectSummarySectionVisible();

        // 7. Validate All Due Dates section metadata
        // - All Due Dates heading
        // - Search for a course or a student input
        // - Due dates table
        await adminDueDates.expectAllDueDatesSectionVisible();

        // 8. Validate footer links
        await adminDueDates.expectAllFooterLinksVisible();
    });

});
