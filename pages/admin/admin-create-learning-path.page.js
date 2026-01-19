const BasePage = require('../base.page');
const AdminNavigationPage = require('./admin-navigation.page');
const StudentFooterPage = require('../student/student-footer.page');

/**
 * AdminCreateLearningPathPage - Create Learning Path page for managers
 * URL: /team/learning-path/create
 */
class AdminCreateLearningPathPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new AdminNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Back link
        this.backLink = page.locator('a.btn-secondary.goback').filter({ hasText: 'Back' });

        // Page title
        this.pageTitle = page.getByRole('heading', { name: 'Creating a new Learning Path' });

        // ========== ACTION BUTTONS ==========
        this.saveAsDraftBtn = page.locator('#btn-save-draft');
        this.cancelBtn = page.locator('a.btn-secondary.goback').filter({ hasText: 'Cancel' });
        this.publishBtn = page.locator('a.btn-primary.btn-save[data-action="publish"]');

        // How does it work? link
        this.howDoesItWorkLink = page.locator('#btn-how-does-it-work');

        // ========== FORM FIELDS ==========
        // Title input
        this.titleLabel = page.locator('label').filter({ hasText: 'Title' });
        this.titleInput = page.locator('#learning-path-title');

        // Description textarea
        this.descriptionLabel = page.locator('label').filter({ hasText: 'Description' });
        this.descriptionTextarea = page.locator('#learning-path-description');

        // Select groups dropdown
        this.selectGroupsLabel = page.locator('label, div').filter({ hasText: 'Select groups allowed to access this path' }).first();
        this.selectGroupsDropdown = page.locator('button.multiselect.dropdown-toggle');

        // ========== TABS ==========
        this.learningPathTab = page.locator('a.tab').filter({ hasText: 'Learning Path' });
        this.studentsTab = page.locator('a.tab').filter({ hasText: /Students/ });

        // ========== COURSE SEARCH ==========
        this.courseSearchInput = page.locator('input.search-course-term');
        this.emptyStateMessage = page.getByText('Search for a course to start building your Learning Path.');

        // ========== STATS ==========
        this.courseCount = page.getByText(/\d+ course\(s\)/);
        this.hoursCount = page.getByText(/\d+ hour\(s\)/);
    }

    /**
     * Navigate to Create Learning Path page
     */
    async goto() {
        await this.page.goto('https://test-spectre.pantheonsite.io/team/learning-path/create');
        await this.page.waitForLoadState('load');
    }

    /**
     * Check if on correct URL
     * @returns {boolean}
     */
    async isOnCorrectURL() {
        const url = this.page.url();
        return url.includes('/learning-path/create');
    }

    /**
     * Click Cancel button to go back
     */
    async clickCancel() {
        await this.cancelBtn.click();
        await this.page.waitForLoadState('load');
    }

    /**
     * Check if back on Manage Learning Paths page
     * @returns {boolean}
     */
    async isOnManageLearningPathsPage() {
        const url = this.page.url();
        return url.includes('/learning-path') && !url.includes('/create');
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
     * Assert action buttons are visible
     */
    async expectActionButtonsVisible() {
        await this.expectVisible(this.saveAsDraftBtn);
        await this.expectVisible(this.cancelBtn);
        await this.expectVisible(this.publishBtn);
    }

    /**
     * Assert How does it work? link is visible
     */
    async expectHowDoesItWorkLinkVisible() {
        await this.expectVisible(this.howDoesItWorkLink);
    }

    /**
     * Assert Title field is visible
     */
    async expectTitleFieldVisible() {
        await this.expectVisible(this.titleInput);
    }

    /**
     * Assert Description field is visible
     */
    async expectDescriptionFieldVisible() {
        await this.expectVisible(this.descriptionTextarea);
    }

    /**
     * Assert Select Groups dropdown is visible
     */
    async expectSelectGroupsDropdownVisible() {
        await this.expectVisible(this.selectGroupsDropdown);
    }

    /**
     * Assert tabs are visible
     */
    async expectTabsVisible() {
        await this.expectVisible(this.learningPathTab);
        await this.expectVisible(this.studentsTab);
    }

    /**
     * Assert course search section is visible
     */
    async expectCourseSearchSectionVisible() {
        await this.expectVisible(this.courseSearchInput);
        await this.expectVisible(this.emptyStateMessage);
    }

    /**
     * Assert stats are visible
     */
    async expectStatsVisible() {
        await this.expectVisible(this.courseCount);
        await this.expectVisible(this.hoursCount);
    }

    /**
     * Assert all footer links are visible
     */
    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }
}

module.exports = AdminCreateLearningPathPage;
