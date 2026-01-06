const BasePage = require('../base.page');
const StudentNavigationPage = require('./student-navigation.page');
const StudentFooterPage = require('./student-footer.page');

/**
 * StudentLeaderboardPage - Leaderboard tab page object
 * Uses composition with shared navigation and footer components
 * URL: /team/{teamId}/leaderboard/{userId}
 */
class StudentLeaderboardPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new StudentNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Main leaderboard container
        this.leaderboardContainer = page.locator('div.leaderboard');

        // Export Chart button
        this.exportChartBtn = page.locator('button#btn-export-open-modal');

        // Top 3 podium cards container
        this.leaderboardHighlights = page.locator('#leaderboard-highlights');

        // Top 3 podium cards - individual cards
        this.podiumCards = page.locator('.highlighted-student');
        this.firstPlaceCard = this.podiumCards.first();
        this.secondPlaceCard = this.podiumCards.nth(1);
        this.thirdPlaceCard = this.podiumCards.nth(2);

        // Rank badges (1st, 2nd, 3rd)
        this.rankBadges = page.locator('.highlighted-student__rank');

        // Table elements
        this.leaderboardTable = page.locator('table');
        this.tableHeaders = page.locator('table th, table thead td');

        // Specific table headers
        this.rankHeader = page.getByRole('columnheader', { name: /rank/i });
        this.studentNameHeader = page.getByRole('columnheader', { name: /student name/i });
        this.totalCourseTimeHeader = page.getByRole('columnheader', { name: /total course time/i });
        this.timeSpentRecordedHeader = page.getByRole('columnheader', { name: /time spent.*recorded/i });
        this.timeSpentLiveHeader = page.getByRole('columnheader', { name: /time spent.*live/i });
        this.coursesCompletedHeader = page.getByRole('columnheader', { name: /courses completed/i });
        this.coursesRegisteredHeader = page.getByRole('columnheader', { name: /courses registered/i });
        this.topCourseHeader = page.getByRole('columnheader', { name: /top course/i });

        // Table rows
        this.tableRows = page.locator('table tbody tr');

        // Pagination
        this.nextPageLink = page.getByRole('link', { name: /next/i });
        this.lastPageLink = page.getByRole('link', { name: /last/i });

        // Export Chart Modal elements - scoped to visible modal
        this.exportModal = page.locator('.modal.show');
        this.exportModalTitle = this.exportModal.locator('.modal-title');
        this.exportModalCloseBtn = this.exportModal.locator('button.close[data-dismiss="modal"]');
        this.exportModalDateRange = this.exportModal.locator('input, .date-picker');
        this.exportModalExportBtn = this.exportModal.locator('button:has-text("EXPORT CHART")');
    }

    /**
     * Navigate to Leaderboard page via navigation menu
     */
    async goto() {
        await this.navigation.navigateToLeaderboard();
    }

    /**
     * Check if Leaderboard page is displayed
     * @returns {Promise<boolean>}
     */
    async isLeaderboardPageDisplayed() {
        return await this.leaderboardContainer.isVisible();
    }

    /**
     * Check if on correct URL
     * @returns {Promise<boolean>}
     */
    async isOnCorrectURL() {
        return this.page.url().includes('leaderboard');
    }

    // --- Export Chart Methods ---

    /**
     * Click Export Chart button to open modal
     */
    async clickExportChart() {
        await this.exportChartBtn.click();
        await this.exportModal.waitFor({ state: 'visible' });
    }

    /**
     * Close Export Chart modal
     */
    async closeExportModal() {
        await this.exportModalCloseBtn.click();
        await this.exportModal.waitFor({ state: 'hidden' });
    }

    /**
     * Check if Export Modal is visible
     * @returns {Promise<boolean>}
     */
    async isExportModalVisible() {
        return await this.exportModal.isVisible();
    }

    // --- Podium Card Methods ---

    /**
     * Get count of podium cards
     * @returns {Promise<number>}
     */
    async getPodiumCardsCount() {
        return await this.podiumCards.count();
    }

    // --- Table Methods ---

    /**
     * Get count of table headers
     * @returns {Promise<number>}
     */
    async getTableHeadersCount() {
        return await this.tableHeaders.count();
    }

    /**
     * Get count of table rows
     * @returns {Promise<number>}
     */
    async getTableRowsCount() {
        return await this.tableRows.count();
    }

    // --- Assertions ---

    /**
     * Assert leaderboard container is visible
     */
    async expectPageHeadingVisible() {
        await this.expectVisible(this.leaderboardContainer);
    }

    /**
     * Assert navigation bar is visible
     */
    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }

    /**
     * Assert Export Chart button is visible
     */
    async expectExportChartBtnVisible() {
        await this.expectVisible(this.exportChartBtn);
    }

    /**
     * Assert first place podium card is visible
     */
    async expectFirstPlaceVisible() {
        await this.expectVisible(this.firstPlaceCard);
    }

    /**
     * Assert second place podium card is visible
     */
    async expectSecondPlaceVisible() {
        await this.expectVisible(this.secondPlaceCard);
    }

    /**
     * Assert third place podium card is visible
     */
    async expectThirdPlaceVisible() {
        await this.expectVisible(this.thirdPlaceCard);
    }

    /**
     * Assert all podium cards are visible
     */
    async expectAllPodiumCardsVisible() {
        await this.expectFirstPlaceVisible();
        await this.expectSecondPlaceVisible();
        await this.expectThirdPlaceVisible();
    }

    /**
     * Assert leaderboard table is visible
     */
    async expectTableVisible() {
        await this.expectVisible(this.leaderboardTable);
    }

    /**
     * Assert all table headers are visible
     */
    async expectAllTableHeadersVisible() {
        await this.expectVisible(this.rankHeader);
        await this.expectVisible(this.studentNameHeader);
        await this.expectVisible(this.totalCourseTimeHeader);
        await this.expectVisible(this.timeSpentRecordedHeader);
        await this.expectVisible(this.timeSpentLiveHeader);
        await this.expectVisible(this.coursesCompletedHeader);
        await this.expectVisible(this.coursesRegisteredHeader);
        await this.expectVisible(this.topCourseHeader);
    }

    /**
     * Assert table has rows
     */
    async expectTableHasRows() {
        const rowCount = await this.getTableRowsCount();
        if (rowCount === 0) {
            throw new Error('No table rows found');
        }
    }

    /**
     * Assert all footer links are visible
     */
    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }

    // --- Modal Assertions ---

    /**
     * Assert Export modal is visible
     */
    async expectExportModalVisible() {
        await this.expectVisible(this.exportModal);
    }

    /**
     * Assert Export modal is hidden
     */
    async expectExportModalHidden() {
        await this.expectHidden(this.exportModal);
    }

    /**
     * Assert Export modal title is visible
     */
    async expectExportModalTitleVisible() {
        await this.expectVisible(this.exportModalTitle);
    }

    /**
     * Assert Export modal close button is visible
     */
    async expectExportModalCloseBtnVisible() {
        await this.expectVisible(this.exportModalCloseBtn);
    }
}

module.exports = StudentLeaderboardPage;
