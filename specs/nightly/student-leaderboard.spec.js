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

        // 9. Validate all 5 time period filter tabs are visible
        await studentLeaderboard.expectFilterTabsVisible();

        // 10. Validate switching filter tabs stays on leaderboard
        await studentLeaderboard.clickFilterTab(studentLeaderboard.last30DaysTab);
        expect(studentLeaderboard.page.url()).toContain('leaderboard');
        await studentLeaderboard.clickFilterTab(studentLeaderboard.allTimeTab);

        // 11. Click Export Chart button to open modal
        await studentLeaderboard.clickExportChart();

        // 12. Validate Export modal is visible
        await studentLeaderboard.expectExportModalVisible();

        // 13. Validate Export modal title is visible
        await studentLeaderboard.expectExportModalTitleVisible();

        // 14. Validate Export modal close button is visible
        await studentLeaderboard.expectExportModalCloseBtnVisible();

        // 15. Close the Export modal
        await studentLeaderboard.closeExportModal();

        // 16. Verify Export modal is closed
        await studentLeaderboard.expectExportModalHidden();

        // 17. Validate footer with all links
        await studentLeaderboard.expectAllFooterLinksVisible();
    });

});
