const BasePage = require('../base.page');
const URLS = require('../../data/urls');

class AdminCoursesPage extends BasePage {
    constructor(page) {
        super(page);
        // Modern locators
        this.coursesTitle = page.getByRole('heading', { name: 'Courses' });
        this.createCourseButton = page.getByRole('button', { name: /create course/i });
        this.coursesTable = page.locator('table.courses-table');
        this.searchInput = page.getByPlaceholder(/search/i);
    }

    async goto() {
        await this.navigate(URLS.ADMIN.COURSES);
    }

    async isCoursesPageDisplayed() {
        return await this.coursesTitle.isVisible();
    }

    async clickCreateCourse() {
        await this.createCourseButton.click();
    }

    async searchCourse(courseName) {
        await this.searchInput.fill(courseName);
    }

    async getCourseRow(courseName) {
        return this.page.locator('tr').filter({ hasText: courseName });
    }

    async editCourse(courseName) {
        const row = this.getCourseRow(courseName);
        await row.getByRole('button', { name: /edit/i }).click();
    }

    async deleteCourse(courseName) {
        const row = this.getCourseRow(courseName);
        await row.getByRole('button', { name: /delete/i }).click();
    }

    async isOnCorrectURL() {
        return this.page.url().includes('courses');
    }

    async expectCoursesPageVisible() {
        await this.expectVisible(this.coursesTitle);
    }
}

module.exports = AdminCoursesPage;
