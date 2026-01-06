const BasePage = require('../base.page');

/**
 * StudentNavigationPage - Shared navigation component for all student pages
 * Contains top navigation bar and sidebar elements
 */
class StudentNavigationPage extends BasePage {
    constructor(page) {
        super(page);

        // Top Navigation - Main tabs
        this.myClassroomLink = page.getByRole('link', { name: 'My Classroom' });
        this.coursesLink = page.getByRole('link', { name: 'Courses' }).first();
        this.learningPathsLink = page.getByRole('link', { name: 'Learning Paths' }).first();
        this.skillsAssessmentsLink = page.getByRole('link', { name: /skill.?assessments/i }).first();
        this.leaderboardLink = page.getByRole('link', { name: 'Leaderboard' });

        // User profile/account
        this.profileIcon = page.locator('.profile-icon');
        this.userMenu = page.locator('.user-menu');

        // Sidebar links (right side)
        this.sidebarWebinars = page.getByRole('link', { name: ' Webinars' }).first();
        this.sidebarNewsletter = page.getByRole('link', { name: ' Newsletter' }).first();
        this.sidebarLiveCourseCalendar = page.getByRole('link', { name: ' Live Course Calendar' }).first();
        this.sidebarMyLiveSchedule = page.getByRole('link', { name: 'My Live Schedule' }).or(
            page.getByLabel('Live Schedule')
        );
        this.sidebarContactSupport = page.getByRole('link', { name: ' Contact Support' }).first();
        this.sidebarSendIdeas = page.getByRole('link', { name: ' Send Ideas' }).first();
    }

    // Navigation methods - Main tabs
    async navigateToMyClassroom() {
        await this.myClassroomLink.click();
        await this.page.waitForLoadState('load');
    }

    async navigateToCourses() {
        await this.coursesLink.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    async navigateToLearningPaths() {
        await this.learningPathsLink.click();
        await this.page.waitForLoadState('load');
    }

    async navigateToSkillsAssessments() {
        await this.skillsAssessmentsLink.click();
        await this.page.waitForLoadState('load');
    }

    async navigateToLeaderboard() {
        await this.leaderboardLink.click();
        await this.page.waitForLoadState('load');
    }

    // Sidebar navigation methods
    async clickWebinars() {
        await this.sidebarWebinars.click();
        await this.page.waitForLoadState('load');
    }

    async clickNewsletter() {
        await this.sidebarNewsletter.click();
        await this.page.waitForLoadState('load');
    }

    async clickLiveCourseCalendar() {
        await this.sidebarLiveCourseCalendar.click();
        await this.page.waitForLoadState('load');
    }

    async clickContactSupport() {
        await this.sidebarContactSupport.click();
        await this.page.waitForLoadState('load');
    }

    async clickSendIdeas() {
        await this.sidebarSendIdeas.click();
        await this.page.waitForLoadState('load');
    }

    async clickMyLiveSchedule() {
        await this.sidebarMyLiveSchedule.click();
        // Modal opens, no page navigation
    }

    // Assertions - Main navigation
    async expectMainNavVisible() {
        await this.expectVisible(this.myClassroomLink);
        await this.expectVisible(this.coursesLink);
        await this.expectVisible(this.learningPathsLink);
        await this.expectVisible(this.skillsAssessmentsLink);
        await this.expectVisible(this.leaderboardLink);
    }

    // Assertions - Sidebar
    async expectSidebarLinksVisible() {
        await this.expectVisible(this.sidebarWebinars);
        await this.expectVisible(this.sidebarNewsletter);
        await this.expectVisible(this.sidebarLiveCourseCalendar);
        await this.expectVisible(this.sidebarContactSupport);
        await this.expectVisible(this.sidebarSendIdeas);
    }
}

module.exports = StudentNavigationPage;
