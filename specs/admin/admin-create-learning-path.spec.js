const { test, expect } = require('../../fixtures/fixtures');

/**
 * Admin - Create Learning Path Page Tests
 * Tests the Create Learning Path page metadata (labels, buttons, fields)
 * URL: /team/learning-path/create
 * Note: Clicks Cancel at the end to avoid creating garbage data
 */
test.describe('Admin - Create Learning Path Page', () => {

    test('should validate create learning path page metadata and cancel', async ({ adminManageLearningPaths, adminCreateLearningPath }) => {
        // 1. Navigate to Manage Learning Paths page
        await adminManageLearningPaths.goto();

        // 2. Click CREATE PATH button
        await adminManageLearningPaths.createPathBtn.click();
        await adminCreateLearningPath.page.waitForLoadState('load');

        // 3. Validate we're on the correct URL
        const isCorrectURL = await adminCreateLearningPath.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();

        // 4. Validate navigation is visible
        await adminCreateLearningPath.expectNavigationVisible();

        // 5. Validate admin sub-navigation is visible
        await adminCreateLearningPath.expectAdminSubNavVisible();

        // 6. Validate page title is visible
        await adminCreateLearningPath.expectPageTitleVisible();

        // 7. Validate action buttons are visible
        // - Save as Draft button
        // - Cancel button
        // - Publish button
        await adminCreateLearningPath.expectActionButtonsVisible();

        // 8. Validate "How does it work?" link is visible
        await adminCreateLearningPath.expectHowDoesItWorkLinkVisible();

        // 9. Validate Title field is visible
        await adminCreateLearningPath.expectTitleFieldVisible();

        // 10. Validate Description field is visible
        await adminCreateLearningPath.expectDescriptionFieldVisible();

        // 11. Validate Select Groups dropdown is visible
        await adminCreateLearningPath.expectSelectGroupsDropdownVisible();

        // 12. Validate tabs are visible
        // - Learning Path tab
        // - Students tab
        await adminCreateLearningPath.expectTabsVisible();

        // 13. Validate course search section is visible
        // - Search input
        // - Empty state message
        await adminCreateLearningPath.expectCourseSearchSectionVisible();

        // 14. Validate stats are visible
        // - 0 course(s)
        // - 0 hour(s)
        await adminCreateLearningPath.expectStatsVisible();

        // 15. Validate footer links
        await adminCreateLearningPath.expectAllFooterLinksVisible();

        // 16. Click Cancel to go back without creating data
        await adminCreateLearningPath.clickCancel();

        // 17. Validate we're back on Manage Learning Paths page
        const isBackOnManagePage = await adminCreateLearningPath.isOnManageLearningPathsPage();
        expect(isBackOnManagePage).toBeTruthy();
    });

});
