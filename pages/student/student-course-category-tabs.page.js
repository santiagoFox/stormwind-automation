const BasePage = require('../base.page');
const StudentNavigationPage = require('./student-navigation.page');

/**
 * StudentCourseCategoryTabsPage - AI category detail page with category tabs and subcategory chips
 * URL: /courses/170334 (Artificial Intelligence (AI) category)
 *
 * Two interactive rows appear below the search box:
 * Row 1 - Category tabs (CURRENTLY BROKEN):
 *   All, Artificial Intelligence (AI), Cloud, Cybersecurity, Desktop Applications,
 *   DevOps, Development, Information Technology (IT), Project Management
 * Row 2 - AI subcategory chips:
 *   All, ChatGPT, Development, Microsoft Copilot, Project Management, Webinars
 */
class StudentCourseCategoryTabsPage extends BasePage {
    constructor(page) {
        super(page);

        this.navigation = new StudentNavigationPage(page);

        // Page structure
        this.pageHeading = page.locator('h1');
        this.breadcrumbCourses = page.locator('#main_container').getByRole('link', { name: 'Courses' });
        this.searchInput = page.getByPlaceholder('What do you want to learn today?');

        // Category tabs row — the subtabs shown below the search box on category detail pages
        // Clicking each tab should navigate to the respective category page (currently broken)
        this.categoryTabAll = page.getByRole('tab', { name: /^All$/i });
        this.categoryTabAI = page.getByRole('tab', { name: /Artificial Intelligence/i });
        this.categoryTabCloud = page.getByRole('tab', { name: /^Cloud$/i });
        this.categoryTabCybersecurity = page.getByRole('tab', { name: /^Cybersecurity$/i });
        this.categoryTabDesktopApps = page.getByRole('tab', { name: /^Desktop Applications$/i });
        this.categoryTabDevOps = page.getByRole('tab', { name: /^DevOps$/i });
        this.categoryTabDevelopment = page.getByRole('tab', { name: /^Development$/i });
        this.categoryTabIT = page.getByRole('tab', { name: /Information Technology/i });
        this.categoryTabProjectMgmt = page.getByRole('tab', { name: /^Project Management$/i });

        // AI subcategory chips — filter row below the category tabs
        this.chipsContainer = page.locator('ul.topic-card__tags');
        this.chipAll = page.locator('li.topic-card__tag[data-id="all"]');
        this.chipChatGPT = page.locator('li.topic-card__tag').filter({ hasText: 'ChatGPT' });
        this.chipDevelopment = page.locator('li.topic-card__tag').filter({ hasText: 'Development' });
        this.chipMicrosoftCopilot = page.locator('li.topic-card__tag').filter({ hasText: 'Microsoft Copilot' });
        this.chipProjectManagement = page.locator('li.topic-card__tag').filter({ hasText: 'Project Management' });
        this.chipWebinars = page.locator('li.topic-card__tag').filter({ hasText: 'Webinars' });

        // Course cards
        this.courseCards = page.locator('.course-card, [class*="course-card"]');
    }

    // REUSE_METHOD: gotoAICategory
    async gotoAICategory() {
        await this.page.goto('/courses/170334');
        await this.page.waitForLoadState('load');
    }

    async clickCategoryTab(tabLocator) {
        await tabLocator.click();
        await this.page.waitForLoadState('load');
    }

    async clickChip(chipName) {
        const chip = this.page.locator('li.topic-card__tag').filter({ hasText: chipName });
        await chip.click();
        await this.page.waitForLoadState('load');
    }

    // --- Assertions ---

    async expectPageHeading(heading) {
        await this.expectVisible(this.pageHeading);
        await this.expectText(this.pageHeading, heading);
    }

    async expectBreadcrumbVisible() {
        await this.expectVisible(this.breadcrumbCourses);
    }

    async expectSearchInputVisible() {
        await this.expectVisible(this.searchInput);
    }

    async expectAllCategoryTabsVisible() {
        await this.expectVisible(this.categoryTabAll);
        await this.expectVisible(this.categoryTabAI);
        await this.expectVisible(this.categoryTabCloud);
        await this.expectVisible(this.categoryTabCybersecurity);
        await this.expectVisible(this.categoryTabDesktopApps);
        await this.expectVisible(this.categoryTabDevOps);
        await this.expectVisible(this.categoryTabDevelopment);
        await this.expectVisible(this.categoryTabIT);
        await this.expectVisible(this.categoryTabProjectMgmt);
    }

    async expectAllAIChipsVisible() {
        await this.expectVisible(this.chipsContainer);
        await this.expectVisible(this.chipAll);
        await this.expectVisible(this.chipChatGPT);
        await this.expectVisible(this.chipDevelopment);
        await this.expectVisible(this.chipMicrosoftCopilot);
        await this.expectVisible(this.chipProjectManagement);
        await this.expectVisible(this.chipWebinars);
    }

    async expectCourseCardsVisible() {
        await this.courseCards.first().waitFor({ state: 'visible', timeout: 10000 });
        const count = await this.courseCards.count();
        if (count === 0) {
            throw new Error('No course cards found');
        }
    }

    async expectChipActive(chipName) {
        const chip = this.page.locator('li.topic-card__tag.active').filter({ hasText: chipName });
        const isVisible = await chip.isVisible();
        if (!isVisible) {
            throw new Error(`Expected chip "${chipName}" to be active but it was not`);
        }
    }

    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }
}

module.exports = StudentCourseCategoryTabsPage;
