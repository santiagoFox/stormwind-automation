const BasePage = require('../base.page');
const URLS = require('../../data/urls');

class AdminAssessmentsPage extends BasePage {
    constructor(page) {
        super(page);
        // Modern locators
        this.assessmentsTitle = page.getByRole('heading', { name: /assessments/i });
        this.createAssessmentButton = page.getByRole('button', { name: /create assessment/i });
        this.assessmentsTable = page.locator('table.assessments-table');
        this.searchInput = page.getByPlaceholder(/search/i);
    }

    async goto() {
        await this.navigate(URLS.ADMIN.ASSESSMENTS);
    }

    async isAssessmentsPageDisplayed() {
        return await this.assessmentsTitle.isVisible();
    }

    async clickCreateAssessment() {
        await this.createAssessmentButton.click();
    }

    async searchAssessment(assessmentName) {
        await this.searchInput.fill(assessmentName);
    }

    async getAssessmentRow(assessmentName) {
        return this.page.locator('tr').filter({ hasText: assessmentName });
    }

    async viewAssessment(assessmentName) {
        const row = this.getAssessmentRow(assessmentName);
        await row.getByRole('button', { name: /view/i }).click();
    }

    async isOnCorrectURL() {
        return this.page.url().includes('assessments');
    }

    async expectAssessmentsPageVisible() {
        await this.expectVisible(this.assessmentsTitle);
    }
}

module.exports = AdminAssessmentsPage;
