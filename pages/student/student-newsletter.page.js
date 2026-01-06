const BasePage = require('../base.page');
const StudentNavigationPage = require('./student-navigation.page');

/**
 * StudentNewsletterPage - Newsletter page (external link, opens in new tab)
 * URL: partners.stormwind.com/*-newsletter/
 * Note: Content changes frequently, only verify page opens correctly
 */
class StudentNewsletterPage extends BasePage {
    constructor(page) {
        super(page);
        this.navigation = new StudentNavigationPage(page);
    }

    /**
     * Click newsletter link and wait for new tab to open
     * @returns {Promise<Page>} The new page/tab that opens
     */
    async clickNewsletterAndGetNewTab(context) {
        // Wait for new page to open after clicking
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            this.navigation.sidebarNewsletter.click()
        ]);

        await newPage.waitForLoadState('domcontentloaded');
        return newPage;
    }

    /**
     * Verify the newsletter page opened correctly
     * @param {Page} newPage - The new tab page object
     */
    async verifyNewsletterPageOpened(newPage) {
        const url = newPage.url();
        return url.includes('partners.stormwind.com') && url.includes('newsletter');
    }

    /**
     * Verify URL contains expected domain
     * @param {Page} newPage - The new tab page object
     */
    async isOnCorrectDomain(newPage) {
        return newPage.url().includes('partners.stormwind.com');
    }

    /**
     * Verify URL contains newsletter
     * @param {Page} newPage - The new tab page object
     */
    async isNewsletterURL(newPage) {
        return newPage.url().includes('newsletter');
    }

    /**
     * Close the new tab
     * @param {Page} newPage - The new tab page object
     */
    async closeNewTab(newPage) {
        await newPage.close();
    }
}

module.exports = StudentNewsletterPage;
