const BasePage = require('../base.page');

/**
 * StudentSendIdeasPage - Send Ideas feedback portal (opens in new tab)
 * External site: feedback.stormwindstudios.com
 */
class StudentSendIdeasPage extends BasePage {
    constructor(page) {
        super(page);

        // Header navigation
        this.sendIdeasNav = page.getByRole('link', { name: 'Send Ideas' });
        this.updatesNav = page.getByRole('link', { name: 'Updates' });
        this.roadmapNav = page.getByRole('link', { name: 'Roadmap' });

        // Main content
        this.mainHeading = page.getByRole('heading', { name: /Hi there/i });
        this.subtitle = page.locator('h2').filter({ hasText: /share your feedback/i });

        // Search and create
        this.searchInput = page.getByPlaceholder('Search...');
        this.createPostButton = page.getByRole('button', { name: /Create a Post/i });

        // Sort/Filter section
        this.trendSortBy = page.getByText('Trend');
        this.allStatusDropdown = page.getByText('All').first();

        // Categories
        this.allCategoriesFilter = page.getByText('All Categories');
        this.featureIdeaCategory = page.getByText('Feature Idea').last();
        this.bugCategory = page.getByText('Bug');
        this.contentIdeaCategory = page.getByText('Content Idea').last();
    }

    /**
     * Open Send Ideas in new tab from sidebar
     * @param {import('@playwright/test').BrowserContext} context - Browser context
     * @param {import('@playwright/test').Page} currentPage - Current page
     * @returns {Promise<import('@playwright/test').Page>} New tab page
     */
    async openFromSidebar(context, currentPage) {
        const sendIdeasLink = currentPage.getByRole('link', { name: ' Send Ideas' }).first();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            sendIdeasLink.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    /**
     * Set the page reference (for new tab)
     */
    setPage(newPage) {
        this.page = newPage;
        // Re-initialize locators with new page
        this.sendIdeasNav = newPage.getByRole('link', { name: 'Send Ideas' });
        this.updatesNav = newPage.getByRole('link', { name: 'Updates' });
        this.roadmapNav = newPage.getByRole('link', { name: 'Roadmap' });
        this.mainHeading = newPage.getByRole('heading', { name: /Hi there/i });
        this.subtitle = newPage.locator('h2').filter({ hasText: /share your feedback/i });
        this.searchInput = newPage.getByPlaceholder('Search...');
        this.createPostButton = newPage.getByRole('button', { name: /Create a Post/i });
        this.trendSortBy = newPage.getByText('Trend');
        this.allStatusDropdown = newPage.getByText('All').first();
        this.allCategoriesFilter = newPage.getByText('All Categories');
        this.featureIdeaCategory = newPage.getByText('Feature Idea').last();
        this.bugCategory = newPage.getByText('Bug');
        this.contentIdeaCategory = newPage.getByText('Content Idea').last();
    }

    // URL verification
    isOnSendIdeasPage() {
        return this.page.url().includes('feedback.stormwindstudios.com');
    }

    // Assertions - Header navigation
    async expectHeaderNavVisible() {
        await this.expectVisible(this.sendIdeasNav);
        await this.expectVisible(this.updatesNav);
        await this.expectVisible(this.roadmapNav);
    }

    // Assertions - Main content
    async expectMainHeadingVisible() {
        await this.expectVisible(this.mainHeading);
    }

    async expectSubtitleVisible() {
        await this.expectVisible(this.subtitle);
    }

    // Assertions - Search and create
    async expectSearchInputVisible() {
        await this.expectVisible(this.searchInput);
    }

    async expectCreatePostButtonVisible() {
        await this.expectVisible(this.createPostButton);
    }

    // Assertions - Categories
    async expectCategoriesVisible() {
        await this.expectVisible(this.allCategoriesFilter);
        await this.expectVisible(this.featureIdeaCategory);
        await this.expectVisible(this.bugCategory);
        await this.expectVisible(this.contentIdeaCategory);
    }

    /**
     * Verify all static page elements
     */
    async verifyPageLoaded() {
        await this.expectHeaderNavVisible();
        await this.expectMainHeadingVisible();
        await this.expectSubtitleVisible();
        await this.expectSearchInputVisible();
        await this.expectCreatePostButtonVisible();
    }
}

module.exports = StudentSendIdeasPage;
