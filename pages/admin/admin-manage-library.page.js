const BasePage = require('../base.page');
const URLS = require('../../data/urls');

class AdminManageLibraryPage extends BasePage {
    constructor(page) {
        super(page);
        // Modern locators
        this.libraryTitle = page.getByRole('heading', { name: /manage library/i });
        this.addContentButton = page.getByRole('button', { name: /add content/i });
        this.libraryTable = page.locator('table.library-table');
        this.searchInput = page.getByPlaceholder(/search/i);
        this.categoryFilter = page.locator('select[name="category"]');
        this.uploadButton = page.getByRole('button', { name: /upload/i });
        this.fileInput = page.locator('input[type="file"]');
    }

    async goto() {
        await this.navigate(URLS.ADMIN.MANAGE_LIBRARY);
    }

    async isManageLibraryPageDisplayed() {
        return await this.libraryTitle.isVisible();
    }

    async clickAddContent() {
        await this.addContentButton.click();
    }

    async searchContent(contentName) {
        await this.searchInput.fill(contentName);
    }

    async selectCategory(category) {
        await this.categoryFilter.selectOption(category);
    }

    async uploadContent(filePath) {
        await this.fileInput.setInputFiles(filePath);
        await this.uploadButton.click();
    }

    async isOnCorrectURL() {
        return this.page.url().includes('manage-library');
    }

    async expectManageLibraryPageVisible() {
        await this.expectVisible(this.libraryTitle);
    }
}

module.exports = AdminManageLibraryPage;
