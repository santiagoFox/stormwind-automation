const BasePage = require('../base.page');
const URLS = require('../../data/urls');

class AdminDashboardPage extends BasePage {
    constructor(page) {
        super(page);
        // Modern locators
        this.dashboardTitle = page.getByRole('heading', { name: 'Dashboard' });
        this.coursesLink = page.getByRole('link', { name: /courses/i });
        this.dueDatesLink = page.getByRole('link', { name: /due.?dates/i });
        this.assessmentsLink = page.getByRole('link', { name: /assessments/i });
        this.manageLibraryLink = page.getByRole('link', { name: /manage.?library/i });
        this.statsCards = page.locator('.stats-card');
    }

    async goto() {
        await this.navigate(URLS.ADMIN.DASHBOARD);
    }

    async isDashboardDisplayed() {
        return await this.dashboardTitle.isVisible();
    }

    async navigateToCourses() {
        await this.coursesLink.click();
        await this.waitForUrl(/.*courses.*/);
    }

    async navigateToDueDates() {
        await this.dueDatesLink.click();
        await this.waitForUrl(/.*due-dates.*/);
    }

    async navigateToAssessments() {
        await this.assessmentsLink.click();
        await this.waitForUrl(/.*assessments.*/);
    }

    async navigateToManageLibrary() {
        await this.manageLibraryLink.click();
        await this.waitForUrl(/.*manage-library.*/);
    }

    async getStatsCardsCount() {
        return await this.statsCards.count();
    }

    async isOnCorrectURL() {
        return this.page.url().includes('dashboard');
    }

    async expectDashboardVisible() {
        await this.expectVisible(this.dashboardTitle);
    }
}

module.exports = AdminDashboardPage;
