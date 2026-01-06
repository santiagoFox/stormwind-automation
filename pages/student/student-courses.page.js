const BasePage = require('../base.page');
const StudentNavigationPage = require('./student-navigation.page');
const StudentFooterPage = require('./student-footer.page');

/**
 * StudentCoursesPage - Courses tab page object
 * Uses composition with shared navigation and footer components
 * URL: /topics (Stage 1 - Topic Categories)
 *
 * Stage 1: Topic Categories (11 cards) - /topics
 * Stage 2: Subcategories within a topic - /courses/{topicId}
 * Stage 3: Individual courses list
 */
class StudentCoursesPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new StudentNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Page heading
        this.pageHeading = page.locator('h1:has-text("Courses")');

        // Topics container
        this.topicsContainer = page.locator('#topics-container');

        // Topic cards (Stage 1 - Categories)
        this.topicCards = page.locator('.topic-card');
        this.topicCardTitles = page.locator('h2.topic-card__title');

        // All 11 expected topic categories
        this.topicAI = page.locator('.topic-card__title a:has-text("Artificial Intelligence (AI)")');
        this.topicCloud = page.locator('.topic-card__title a:has-text("Cloud")');
        this.topicCybersecurity = page.locator('.topic-card__title a:has-text("Cybersecurity")');
        this.topicDesktopApps = page.locator('.topic-card__title a:has-text("Desktop Applications")');
        this.topicDevOps = page.locator('.topic-card__title a:has-text("DevOps")');
        this.topicDevelopment = page.locator('.topic-card__title a:has-text("Development")');
        this.topicIT = page.locator('.topic-card__title a:has-text("Information Technology (IT)")');
        this.topicProjectMgmt = page.locator('.topic-card__title a:has-text("Project Management")');
        this.topicRanges = page.locator('.topic-card__title a:has-text("Ranges")');
        this.topicSecurityAwareness = page.locator('.topic-card__title a:has-text("Security Awareness")');
        this.topicSkillsAssessments = page.locator('.topic-card__title a:has-text("Skills Assessments")');
    }

    /**
     * Navigate to Courses page via navigation menu
     */
    async goto() {
        await this.navigation.navigateToCourses();
    }

    /**
     * Check if Courses page is displayed
     * @returns {Promise<boolean>}
     */
    async isCoursesPageDisplayed() {
        return await this.pageHeading.isVisible();
    }

    /**
     * Check if on correct URL (topics page)
     * @returns {Promise<boolean>}
     */
    async isOnCorrectURL() {
        return this.page.url().includes('/topics');
    }

    /**
     * Get count of topic cards
     * @returns {Promise<number>}
     */
    async getTopicCardsCount() {
        return await this.topicCards.count();
    }

    /**
     * Click on a specific topic card by name
     * @param {string} topicName - The topic name to click
     */
    async clickTopicCard(topicName) {
        const topicLink = this.page.locator(`.topic-card__title a:has-text("${topicName}")`);
        await topicLink.click();
        await this.page.waitForLoadState('load');
    }

    /**
     * Click on Artificial Intelligence (AI) topic
     */
    async clickAITopic() {
        await this.topicAI.click();
        await this.page.waitForLoadState('load');
    }

    // --- Assertions ---

    /**
     * Assert page heading is visible
     */
    async expectPageHeadingVisible() {
        await this.expectVisible(this.pageHeading);
    }

    /**
     * Assert navigation bar is visible
     */
    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }

    /**
     * Assert topics container is visible
     */
    async expectTopicsContainerVisible() {
        await this.expectVisible(this.topicsContainer);
    }

    /**
     * Assert topic cards are visible (at least one)
     */
    async expectTopicCardsVisible() {
        await this.topicCards.first().waitFor({ state: 'visible', timeout: 10000 });
        const count = await this.getTopicCardsCount();
        if (count === 0) {
            throw new Error('No topic cards found');
        }
    }

    /**
     * Assert all 11 topic category cards are visible
     */
    async expectAllTopicCategoriesVisible() {
        await this.expectVisible(this.topicAI);
        await this.expectVisible(this.topicCloud);
        await this.expectVisible(this.topicCybersecurity);
        await this.expectVisible(this.topicDesktopApps);
        await this.expectVisible(this.topicDevOps);
        await this.expectVisible(this.topicDevelopment);
        await this.expectVisible(this.topicIT);
        await this.expectVisible(this.topicProjectMgmt);
        await this.expectVisible(this.topicRanges);
        await this.expectVisible(this.topicSecurityAwareness);
        await this.expectVisible(this.topicSkillsAssessments);
    }

    /**
     * Assert all footer links are visible
     */
    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }
}

module.exports = StudentCoursesPage;
