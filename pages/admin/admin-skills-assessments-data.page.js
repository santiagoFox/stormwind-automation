const BasePage = require('../base.page');
const AdminNavigationPage = require('./admin-navigation.page');
const StudentFooterPage = require('../student/student-footer.page');

/**
 * AdminSkillsAssessmentsDataPage - Skills Assessments Data page for managers
 * URL: /team/{teamId}/skills-assessment/{userId}
 */
class AdminSkillsAssessmentsDataPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new AdminNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Page title
        // <h1 class="page-title h2 mb-0 font-weight-semibold no-left-margin">Skills Assessments</h1>
        this.pageTitle = page.locator('h1.page-title');

        // VIEW SKILLS ASSESSMENTS button
        // <a class="btn btn-outline-dark font-weight-bold" href="/skillsassessment">
        this.viewSkillsAssessmentsBtn = page.locator('a.btn.btn-outline-dark[href="/skillsassessment"]');

        // ========== MOST POPULAR SKILLS ASSESSMENT SECTION ==========
        this.mostPopularLabel = page.getByText('Most Popular Skills Assessment');
        this.averageScoreLabel = page.locator('.average-score-description span');
        this.totalCompletedLabel = page.locator('.total-completed-description span');

        // ========== SKILLS ASSESSMENT DETAILS SECTION ==========
        this.detailsHeading = page.getByRole('heading', { name: 'Skills Assessment Details' });
        this.searchInput = page.getByRole('textbox', { name: 'Search', exact: true });

        // Table headers
        this.skillAssessmentHeader = page.getByRole('columnheader', { name: /Skill Assessment/i });
        this.lastEngagementHeader = page.getByRole('columnheader', { name: /Last Engagement/i });
        this.studentsRegisteredHeader = page.getByRole('columnheader', { name: /Students Registered/i });
        this.studentsCompletedHeader = page.getByRole('columnheader', { name: /Students Completed/i });

        // Table
        this.assessmentsTable = page.locator('table').first();
    }

    /**
     * Navigate to Skills Assessments Data page
     */
    async goto() {
        await this.page.goto('https://test-spectre.pantheonsite.io/team/19126/skills-assessment/145164');
        await this.page.waitForLoadState('load');
    }

    /**
     * Check if on correct URL
     * @returns {boolean}
     */
    async isOnCorrectURL() {
        const url = this.page.url();
        return url.includes('/skills-assessment/');
    }

    /**
     * Search for a skills assessment
     * @param {string} searchText - Text to search for
     */
    async searchAssessment(searchText) {
        await this.searchInput.fill(searchText);
        await this.page.waitForTimeout(500);
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
     * Assert VIEW SKILLS ASSESSMENTS button is visible
     */
    async expectViewSkillsAssessmentsBtnVisible() {
        await this.expectVisible(this.viewSkillsAssessmentsBtn);
    }

    /**
     * Assert Most Popular section metadata is visible
     */
    async expectMostPopularSectionVisible() {
        await this.expectVisible(this.mostPopularLabel);
        await this.expectVisible(this.averageScoreLabel);
        await this.expectVisible(this.totalCompletedLabel);
    }

    /**
     * Assert Skills Assessment Details section metadata is visible
     */
    async expectDetailsSectionVisible() {
        await this.expectVisible(this.detailsHeading);
        await this.expectVisible(this.searchInput);
        await this.expectVisible(this.assessmentsTable);
    }

    /**
     * Assert all footer links are visible
     */
    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }

    /**
     * Assert complete Skills Assessments Data page
     */
    async expectSkillsAssessmentsDataPageComplete() {
        await this.expectNavigationVisible();
        await this.expectAdminSubNavVisible();
        await this.expectPageTitleVisible();
        await this.expectViewSkillsAssessmentsBtnVisible();
        await this.expectMostPopularSectionVisible();
        await this.expectDetailsSectionVisible();
        await this.expectAllFooterLinksVisible();
    }
}

module.exports = AdminSkillsAssessmentsDataPage;
