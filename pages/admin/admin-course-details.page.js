const BasePage = require('../base.page');
const AdminNavigationPage = require('./admin-navigation.page');
const AdminAssignCourseModalPage = require('./admin-assign-course-modal.page');
// Reuse StudentFooterPage since footer is identical
const StudentFooterPage = require('../student/student-footer.page');

/**
 * AdminCourseDetailsPage - Course details page for managers/admins
 * Has additional "+ ASSIGN COURSE" button on hero banner
 * URL: /{category}/{subcategory}/{course-slug}
 */
class AdminCourseDetailsPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new AdminNavigationPage(page);
        this.footer = new StudentFooterPage(page);
        this.assignCourseModal = new AdminAssignCourseModalPage(page);

        // Hero Banner
        this.heroBanner = page.locator('.course-hero, [class*="hero"], .banner').first();
        this.heroTitle = page.locator('.course-hero h1, .banner h1, [class*="hero"] h1').first();
        this.heroLevel = page.locator('.course-hero, .banner').getByText(/Beginner|Intermediate|Advanced/i).first();
        this.heroDuration = page.locator('.course-hero, .banner').locator('text=/\\d+\\s*(hour|min)/i').first();
        this.heroInstructor = page.locator('.course-hero, .banner').getByText(/By:/i).first();

        // Manager-specific: Assign Course button on hero banner
        // <button class="btn btn-md btn-outline-primary js-assign-course">
        this.assignCourseBtn = page.locator('button.js-assign-course');

        // Progress indicator (if course already assigned)
        this.progressIndicator = page.getByText(/\d+%\s*complete/i);

        // Overview section
        this.overviewHeading = page.getByRole('heading', { name: 'Overview' });
    }

    /**
     * Navigate to a specific course details page
     * @param {string} url - Full URL to navigate to
     */
    async goto(url) {
        await this.page.goto(url);
        await this.page.waitForLoadState('load');
    }

    /**
     * Navigate to PL-300 Microsoft Power BI Data Analyst course
     */
    async gotoPL300Course() {
        await this.goto('https://test-spectre.pantheonsite.io/microsoft-it/microsoft-power-platform/pl-300-microsoft-power-bi-data-analyst#no-back');
    }

    /**
     * Click the Assign Course button to open modal
     */
    async clickAssignCourse() {
        await this.assignCourseBtn.click();
        await this.assignCourseModal.waitForModal();
    }

    /**
     * Check if on correct URL
     * @param {string} expectedPath - Expected path segment
     * @returns {boolean}
     */
    async isOnCorrectURL(expectedPath = 'pl-300-microsoft-power-bi-data-analyst') {
        const url = this.page.url();
        return url.includes(expectedPath);
    }

    // --- Assertions ---

    /**
     * Assert navigation bar is visible
     */
    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }

    /**
     * Assert hero title is visible
     */
    async expectHeroTitleVisible() {
        await this.expectVisible(this.heroTitle);
    }

    /**
     * Assert Assign Course button is visible (manager-specific)
     */
    async expectAssignCourseBtnVisible() {
        await this.expectVisible(this.assignCourseBtn);
    }

    /**
     * Assert Overview section is visible
     */
    async expectOverviewSectionVisible() {
        await this.expectVisible(this.overviewHeading);
    }

    /**
     * Assert all footer links are visible
     */
    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }
}

module.exports = AdminCourseDetailsPage;
