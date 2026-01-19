const { test, expect } = require('../../fixtures/fixtures');

/**
 * Admin - Manage Learning Paths Page Tests
 * Tests the Manage Learning Paths page with archive/publish functionality
 * URL: /team/learning-path
 */
test.describe('Admin - Manage Learning Paths Page', () => {

    test('should validate page metadata and archive/publish learning path', async ({ adminManageLearningPaths }) => {
        // 1. Navigate to Manage Learning Paths page
        await adminManageLearningPaths.goto();

        // 2. Validate we're on the correct URL
        const isCorrectURL = await adminManageLearningPaths.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();

        // 3. Validate navigation is visible
        await adminManageLearningPaths.expectNavigationVisible();

        // 4. Validate admin sub-navigation is visible
        await adminManageLearningPaths.expectAdminSubNavVisible();

        // 5. Validate page title is visible
        await adminManageLearningPaths.expectPageTitleVisible();

        // 6. Validate CREATE PATH button is visible
        await adminManageLearningPaths.expectCreatePathBtnVisible();

        // 7. Validate Active Paths section is visible
        await adminManageLearningPaths.expectActivePathsSectionVisible();

        // 8. Validate Archived Paths section is visible
        await adminManageLearningPaths.expectArchivedPathsSectionVisible();

        // 9. Validate both LPs are in Active Paths with 3 action buttons each
        await adminManageLearningPaths.expectLPInActivePathsWithButtons('Mobile Manager Active LP');
        await adminManageLearningPaths.expectLPInActivePathsWithButtons('Mobile Manager Archived LP');

        // ========== ARCHIVE FLOW ==========

        // 10. Click Archive button for "Mobile Manager Archived LP"
        await adminManageLearningPaths.clickArchive('Mobile Manager Archived LP');

        // 11. Validate LP is moved to Archived Paths section
        await adminManageLearningPaths.expectLPInArchivedPaths('Mobile Manager Archived LP');

        // 12. Validate LP is NOT in Active Paths anymore
        await adminManageLearningPaths.expectLPNotInActivePaths('Mobile Manager Archived LP');

        // ========== PUBLISH FLOW ==========

        // 13. Click Publish button for "Mobile Manager Archived LP" in Archived section
        await adminManageLearningPaths.clickPublish('Mobile Manager Archived LP');

        // 14. Validate LP is moved back to Active Paths section
        await adminManageLearningPaths.expectLPInActivePathsWithButtons('Mobile Manager Archived LP');

        // 15. Validate LP is NOT in Archived Paths anymore
        await adminManageLearningPaths.expectLPNotInArchivedPaths('Mobile Manager Archived LP');

        // 16. Validate footer links
        await adminManageLearningPaths.expectAllFooterLinksVisible();
    });

});
