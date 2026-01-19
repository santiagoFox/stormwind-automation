const BasePage = require('../base.page');
const AdminNavigationPage = require('./admin-navigation.page');
const StudentFooterPage = require('../student/student-footer.page');

/**
 * AdminManageLearningPathsPage - Manage Learning Paths page for managers
 * URL: /team/learning-path
 */
class AdminManageLearningPathsPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new AdminNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Page title
        this.pageTitle = page.getByRole('heading', { name: 'Learning Paths', exact: true });

        // CREATE PATH button
        // <a class="btn btn-primary ml-5" href="/team/learning-path/create">
        this.createPathBtn = page.locator('a[href="/team/learning-path/create"]');

        // ========== ACTIVE PATHS SECTION ==========
        this.activePathsHeading = page.getByRole('heading', { name: 'Active Paths' });
        this.activePathsSearchInput = page.getByPlaceholder('Search for a Learning Path');
        this.activePathsTable = page.locator('#manager-learning-path-div table').first();

        // ========== ARCHIVED PATHS SECTION ==========
        this.archivedPathsHeading = page.getByRole('heading', { name: 'Archived Paths' });
        this.archivedPathsTable = page.locator('#manager-learning-path-archived-div table').first();
    }

    /**
     * Navigate to Manage Learning Paths page
     */
    async goto() {
        await this.page.goto('https://test-spectre.pantheonsite.io/team/learning-path');
        await this.page.waitForLoadState('load');
    }

    /**
     * Check if on correct URL
     * @returns {boolean}
     */
    async isOnCorrectURL() {
        const url = this.page.url();
        return url.includes('/learning-path');
    }

    /**
     * Get a learning path row by name in Active Paths section
     * @param {string} lpName - Name of the learning path
     * @returns {Locator}
     */
    getActivePathRow(lpName) {
        return this.page.locator('#manager-learning-path-div tr').filter({ hasText: lpName });
    }

    /**
     * Get a learning path row by name in Archived Paths section
     * @param {string} lpName - Name of the learning path
     * @returns {Locator}
     */
    getArchivedPathRow(lpName) {
        return this.page.locator('#manager-learning-path-archived-div tr').filter({ hasText: lpName });
    }

    /**
     * Get Archive button for a specific LP in Active Paths
     * @param {string} lpName - Name of the learning path
     * @returns {Locator}
     */
    getArchiveButton(lpName) {
        return this.getActivePathRow(lpName).locator('a.btn-archive');
    }

    /**
     * Get Receive Report button for a specific LP in Active Paths
     * @param {string} lpName - Name of the learning path
     * @returns {Locator}
     */
    getReportButton(lpName) {
        return this.getActivePathRow(lpName).locator('a.btn-report');
    }

    /**
     * Get Edit button for a specific LP in Active Paths
     * @param {string} lpName - Name of the learning path
     * @returns {Locator}
     */
    getEditButton(lpName) {
        return this.getActivePathRow(lpName).locator('a.btn-edit');
    }

    /**
     * Get Publish button for a specific LP in Archived Paths
     * @param {string} lpName - Name of the learning path
     * @returns {Locator}
     */
    getPublishButton(lpName) {
        return this.getArchivedPathRow(lpName).locator('a.btn-unarchive');
    }

    /**
     * Click Archive button for a specific LP
     * @param {string} lpName - Name of the learning path
     */
    async clickArchive(lpName) {
        await this.getArchiveButton(lpName).click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Click Publish button for a specific LP in Archived section
     * @param {string} lpName - Name of the learning path
     */
    async clickPublish(lpName) {
        await this.getPublishButton(lpName).click();
        await this.page.waitForTimeout(1000);
    }

    /**
     * Check if LP is in Active Paths section
     * @param {string} lpName - Name of the learning path
     * @returns {Promise<boolean>}
     */
    async isLPInActivePaths(lpName) {
        return await this.getActivePathRow(lpName).isVisible();
    }

    /**
     * Check if LP is in Archived Paths section
     * @param {string} lpName - Name of the learning path
     * @returns {Promise<boolean>}
     */
    async isLPInArchivedPaths(lpName) {
        return await this.getArchivedPathRow(lpName).isVisible();
    }

    // --- Assertions ---

    /**
     * Assert navigation bar is visible
     */
    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }

    /**
     * Assert admin sub-navigation is visible
     */
    async expectAdminSubNavVisible() {
        await this.navigation.expectAdminSubNavVisible();
    }

    /**
     * Assert page title is visible
     */
    async expectPageTitleVisible() {
        await this.expectVisible(this.pageTitle);
    }

    /**
     * Assert CREATE PATH button is visible
     */
    async expectCreatePathBtnVisible() {
        await this.expectVisible(this.createPathBtn);
    }

    /**
     * Assert Active Paths section is visible
     */
    async expectActivePathsSectionVisible() {
        await this.expectVisible(this.activePathsHeading);
        await this.expectVisible(this.activePathsSearchInput);
    }

    /**
     * Assert Archived Paths section is visible
     */
    async expectArchivedPathsSectionVisible() {
        await this.expectVisible(this.archivedPathsHeading);
    }

    /**
     * Assert LP is visible in Active Paths with action buttons
     * @param {string} lpName - Name of the learning path
     */
    async expectLPInActivePathsWithButtons(lpName) {
        await this.expectVisible(this.getActivePathRow(lpName));
        await this.expectVisible(this.getArchiveButton(lpName));
        await this.expectVisible(this.getReportButton(lpName));
        await this.expectVisible(this.getEditButton(lpName));
    }

    /**
     * Assert LP is visible in Archived Paths
     * @param {string} lpName - Name of the learning path
     */
    async expectLPInArchivedPaths(lpName) {
        await this.expectVisible(this.getArchivedPathRow(lpName));
    }

    /**
     * Assert LP is NOT visible in Active Paths
     * @param {string} lpName - Name of the learning path
     */
    async expectLPNotInActivePaths(lpName) {
        await this.expectHidden(this.getActivePathRow(lpName));
    }

    /**
     * Assert LP is NOT visible in Archived Paths
     * @param {string} lpName - Name of the learning path
     */
    async expectLPNotInArchivedPaths(lpName) {
        await this.expectHidden(this.getArchivedPathRow(lpName));
    }

    /**
     * Assert all footer links are visible
     */
    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }
}

module.exports = AdminManageLearningPathsPage;
