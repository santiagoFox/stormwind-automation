const BasePage = require('../base.page');
const StudentNavigationPage = require('./student-navigation.page');
const StudentFooterPage = require('./student-footer.page');
const URLS = require('../../data/urls');

/**
 * StudentMyClassroomPage - My Classroom tab page object
 * Uses composition with shared navigation and footer components
 */
class StudentMyClassroomPage extends BasePage {
    constructor(page) {
        super(page);

        // Compose shared components
        this.navigation = new StudentNavigationPage(page);
        this.footer = new StudentFooterPage(page);

        // Page-specific elements
        this.welcomeMessage = page.getByText(/Welcome back,/);

        // Content tabs within My Classroom
        this.coursesTab = page.getByRole('tab', { name: 'Courses' });
        this.learningPathsTab = page.getByRole('tab', { name: 'Learning Paths' });
        this.skillsAssessmentTab = page.getByRole('tab', { name: 'Skills Assessment' });

        // Course content
        this.coursesList = page.locator('.courses-list');
        this.courseCards = page.locator('.course-card');
    }

    async goto() {
        await this.navigate(URLS.STUDENT.MY_CLASSROOM);
    }

    async navigateFromNav() {
        await this.navigation.navigateToMyClassroom();
    }

    // Tab interactions
    async clickCoursesTab() {
        await this.coursesTab.click();
    }

    async clickLearningPathsTab() {
        await this.learningPathsTab.click();
    }

    async clickSkillsAssessmentTab() {
        await this.skillsAssessmentTab.click();
    }

    // Course interactions
    async getCoursesCount() {
        return await this.courseCards.count();
    }

    async getCourseCard(courseName) {
        return this.courseCards.filter({ hasText: courseName });
    }

    async enrollInCourse(courseName) {
        const courseCard = this.getCourseCard(courseName);
        await courseCard.getByRole('button', { name: /enroll/i }).click();
    }

    // URL verification
    async isOnCorrectURL() {
        return this.page.url().includes('my_classroom');
    }

    // Assertions - Page specific
    async expectWelcomeMessageVisible() {
        await this.expectVisible(this.welcomeMessage);
    }

    async expectTabsVisible() {
        await this.expectVisible(this.coursesTab);
        await this.expectVisible(this.learningPathsTab);
        await this.expectVisible(this.skillsAssessmentTab);
    }

    // Convenience methods that delegate to composed components
    async expectSidebarLinksVisible() {
        await this.navigation.expectSidebarLinksVisible();
    }

    async expectAllFooterLinksVisible() {
        await this.footer.expectAllFooterLinksVisible();
    }
}

module.exports = StudentMyClassroomPage;
