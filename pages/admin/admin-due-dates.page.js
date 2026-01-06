const BasePage = require('../base.page');
const URLS = require('../../data/urls');

class AdminDueDatesPage extends BasePage {
    constructor(page) {
        super(page);
        // Modern locators
        this.dueDatesTitle = page.getByRole('heading', { name: /due dates/i });
        this.createDueDateButton = page.getByRole('button', { name: /create due date/i });
        this.dueDatesTable = page.locator('table.due-dates-table');
        this.filterDropdown = page.locator('select[name="filter"]');
        this.dateInput = page.locator('input[type="date"]');
    }

    async goto() {
        await this.navigate(URLS.ADMIN.DUE_DATES);
    }

    async isDueDatesPageDisplayed() {
        return await this.dueDatesTitle.isVisible();
    }

    async clickCreateDueDate() {
        await this.createDueDateButton.click();
    }

    async selectFilter(filterValue) {
        await this.filterDropdown.selectOption(filterValue);
    }

    async setDueDate(date) {
        await this.dateInput.fill(date);
    }

    async isOnCorrectURL() {
        return this.page.url().includes('due-dates');
    }

    async expectDueDatesPageVisible() {
        await this.expectVisible(this.dueDatesTitle);
    }
}

module.exports = AdminDueDatesPage;
