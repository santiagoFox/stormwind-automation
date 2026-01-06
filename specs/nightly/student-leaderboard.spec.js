const { test, expect } = require('../../fixtures/fixtures');

/**
 * Student - Leaderboard Page Tests
 * All validations run in a single test to avoid multiple logins
 */
test.describe('Student - Leaderboard Page', () => {

    test('should validate Leaderboard page elements, table, podium cards, export modal and footer', async ({ studentLeaderboard }) => {
        // Navigate to Leaderboard page
        await studentLeaderboard.goto();

        // 1. Validate URL
        const isCorrectURL = await studentLeaderboard.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
        expect(studentLeaderboard.page.url()).toContain('leaderboard');

        // 2. Validate page heading
        await studentLeaderboard.expectPageHeadingVisible();

        // 3. Validate navigation bar is visible
        await studentLeaderboard.expectNavigationVisible();

        // 4. Validate Export Chart button is visible
        await studentLeaderboard.expectExportChartBtnVisible();

        // 5. Validate top 3 podium cards are visible
        await studentLeaderboard.expectAllPodiumCardsVisible();

        // 6. Validate leaderboard table is visible
        await studentLeaderboard.expectTableVisible();

        // 7. Validate all table headers are visible
        await studentLeaderboard.expectAllTableHeadersVisible();

        // 8. Validate table has data rows
        await studentLeaderboard.expectTableHasRows();

        // 9. Click Export Chart button to open modal
        await studentLeaderboard.clickExportChart();

        // 10. Validate Export modal is visible
        await studentLeaderboard.expectExportModalVisible();

        // 11. Validate Export modal title is visible
        await studentLeaderboard.expectExportModalTitleVisible();

        // 12. Validate Export modal close button is visible
        await studentLeaderboard.expectExportModalCloseBtnVisible();

        // 13. Close the Export modal
        await studentLeaderboard.closeExportModal();

        // 14. Verify Export modal is closed
        await studentLeaderboard.expectExportModalHidden();

        // 15. Validate footer with all links
        await studentLeaderboard.expectAllFooterLinksVisible();
    });

});
