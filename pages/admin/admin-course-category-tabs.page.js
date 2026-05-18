const BasePage = require('../base.page');
const AdminNavigationPage = require('./admin-navigation.page');

/**
 * AdminCourseCategoryTabsPage - AI category detail page for the admin/manager user
 * URL: /courses/170334 (Artificial Intelligence (AI) category)
 *
 * Admin sees more category tabs than students (15 total vs 12):
 * Row 1 - Category tabs (scrollable via chevron buttons):
 *   All, Artificial Intelligence (AI), Business Skills, Cloud, Cybersecurity,
 *   Data Science, Desktop Applications, DevOps, Development,
 *   Information Technology (IT), Project Management, Ranges,
 *   Security Awareness, Skills Assessments, StormWind Internal
 * Row 2 - AI subcategory chips (more than student view):
 *   All, Amazon Web Services (AWS), Azure, ChatGPT, Development,
 *   Gemini, General AI, Microsoft Copilot, OpenAI, Project Management, Webinars
 */
class AdminCourseCategoryTabsPage extends BasePage {
    constructor(page) {
        super(page);

        this.navigation = new AdminNavigationPage(page);

        // Page structure
        this.pageHeading = page.locator('h1');
        this.breadcrumbCourses = page.locator('#main_container').getByRole('link', { name: 'Courses' });
        this.searchInput = page.getByPlaceholder('What do you want to learn today?');

        // Category tabs row — same HTML structure as student, additional admin-only tabs
        this.categoryTabsContainer = page.locator('nav.courses-parent-tabs');
        this.categoryTabAll = page.locator('a.courses-parent-tabs__link').filter({ hasText: /^All$/ });
        this.categoryTabAI = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'Artificial Intelligence' });
        this.categoryTabBusinessSkills = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'Business Skills' });
        this.categoryTabCloud = page.locator('a.courses-parent-tabs__link').filter({ hasText: /^Cloud$/ });
        this.categoryTabCybersecurity = page.locator('a.courses-parent-tabs__link').filter({ hasText: /^Cybersecurity$/ });
        this.categoryTabDataScience = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'Data Science' });
        this.categoryTabDesktopApps = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'Desktop Applications' });
        this.categoryTabDevOps = page.locator('a.courses-parent-tabs__link').filter({ hasText: /^DevOps$/ });
        this.categoryTabDevelopment = page.locator('a.courses-parent-tabs__link').filter({ hasText: /^Development$/ });
        this.categoryTabIT = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'Information Technology' });
        this.categoryTabProjectMgmt = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'Project Management' });
        this.categoryTabRanges = page.locator('a.courses-parent-tabs__link').filter({ hasText: /^Ranges$/ });
        this.categoryTabSecurityAwareness = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'Security Awareness' });
        this.categoryTabSkillsAssessments = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'Skills Assessments' });
        this.categoryTabStormWindInternal = page.locator('a.courses-parent-tabs__link').filter({ hasText: 'StormWind Internal' });

        // Scroll chevron buttons
        this.scrollRightButton = page.locator('button.courses-parent-tabs__arrow--right[aria-label="Scroll right"]');
        this.scrollLeftButton = page.locator('button.courses-parent-tabs__arrow--left[aria-label="Scroll left"]');
        this.scrollRightButtonActive = page.locator('button.courses-parent-tabs__arrow--right:not(.inactive)');
        this.scrollLeftButtonActive = page.locator('button.courses-parent-tabs__arrow--left:not(.inactive)');

        // AI subcategory chips — admin sees more chips than student
        this.chipsContainer = page.locator('ul.topic-card__tags');
        this.chipAll = page.locator('li.topic-card__tag[data-id="all"]');
        this.chipAWS = page.locator('li.topic-card__tag').filter({ hasText: 'Amazon Web Services' });
        this.chipAzure = page.locator('li.topic-card__tag').filter({ hasText: 'Azure' });
        this.chipChatGPT = page.locator('li.topic-card__tag').filter({ hasText: 'ChatGPT' });
        this.chipDevelopment = page.locator('li.topic-card__tag').filter({ hasText: 'Development' });
        this.chipGemini = page.locator('li.topic-card__tag').filter({ hasText: 'Gemini' });
        this.chipGeneralAI = page.locator('li.topic-card__tag').filter({ hasText: 'General AI' });
        this.chipMicrosoftCopilot = page.locator('li.topic-card__tag').filter({ hasText: 'Microsoft Copilot' });
        this.chipOpenAI = page.locator('li.topic-card__tag').filter({ hasText: 'OpenAI' });
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

    async clickScrollRight() {
        await this.scrollRightButtonActive.dispatchEvent('click');
    }

    // Scroll right until the right chevron becomes inactive (fully scrolled to end).
    async scrollToEnd() {
        for (let i = 0; i < 10; i++) {
            if (await this.page.locator('button.courses-parent-tabs__arrow--right:not(.inactive)').count() === 0) break;
            await this.scrollRightButtonActive.dispatchEvent('click');
            await this.page.locator('button.courses-parent-tabs__arrow--right.inactive')
                .waitFor({ state: 'attached', timeout: 3000 })
                .catch(() => {});
        }
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

    async expectNavigationVisible() {
        await this.navigation.expectMainNavVisible();
    }

    async expectScrollRightVisible() {
        await this.expectVisible(this.scrollRightButton);
    }

    async expectScrollRightInactive() {
        await this.page.locator('button.courses-parent-tabs__arrow--right.inactive')
            .waitFor({ state: 'attached', timeout: 5000 });
    }

    async expectInitialTabsVisible() {
        await this.expectVisible(this.categoryTabsContainer);
        await this.expectVisible(this.categoryTabAll);
        await this.expectVisible(this.categoryTabAI);
        await this.expectVisible(this.categoryTabBusinessSkills);
        await this.expectVisible(this.categoryTabCloud);
    }

    async expectAllCategoryTabsVisible() {
        await this.expectVisible(this.categoryTabsContainer);
        await this.expectVisible(this.categoryTabAll);
        await this.expectVisible(this.categoryTabAI);
        await this.expectVisible(this.categoryTabBusinessSkills);
        await this.expectVisible(this.categoryTabCloud);
        await this.expectVisible(this.categoryTabCybersecurity);
        await this.expectVisible(this.categoryTabDataScience);
        await this.expectVisible(this.categoryTabDesktopApps);
        await this.expectVisible(this.categoryTabDevOps);
        await this.expectVisible(this.categoryTabDevelopment);
        await this.expectVisible(this.categoryTabIT);
        await this.expectVisible(this.categoryTabProjectMgmt);
        await this.expectVisible(this.categoryTabRanges);
        await this.expectVisible(this.categoryTabSecurityAwareness);
        await this.expectVisible(this.categoryTabSkillsAssessments);
        await this.expectVisible(this.categoryTabStormWindInternal);
    }

    async expectAllAIChipsVisible() {
        await this.expectVisible(this.chipsContainer);
        await this.expectVisible(this.chipAll);
        await this.expectVisible(this.chipAWS);
        await this.expectVisible(this.chipAzure);
        await this.expectVisible(this.chipChatGPT);
        await this.expectVisible(this.chipDevelopment);
        await this.expectVisible(this.chipGemini);
        await this.expectVisible(this.chipGeneralAI);
        await this.expectVisible(this.chipMicrosoftCopilot);
        await this.expectVisible(this.chipOpenAI);
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
}

module.exports = AdminCourseCategoryTabsPage;
