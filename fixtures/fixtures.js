const base = require('@playwright/test').test;
const { expect } = require('@playwright/test');
const users = require('../data/users');
const URLS = require('../data/urls');

// Page Objects - Shared
const LoginPage = require('../pages/login.page');

// Page Objects - Admin (from admin directory)
const {
    AdminNavigationPage,
    AdminDashboardPage,
    AdminCourseDetailsPage,
    AdminAssignCourseModalPage,
    AdminDueDatesPage,
    AdminSkillsAssessmentsDataPage,
    AdminAddUsersPage,
    AdminManageLearningPathsPage,
    AdminCreateLearningPathPage
} = require('../pages/admin');

// Page Objects - Student (from student directory)
const {
    StudentNavigationPage,
    StudentFooterPage,
    StudentMyClassroomPage,
    StudentCoursesPage,
    StudentCoursesListPage,
    StudentCourseDetailsPage,
    StudentCourseDetailsSupplementsPage,
    StudentCourseLessonsPage,
    StudentLearningPathsPage,
    StudentSkillsAssessmentsPage,
    StudentLeaderboardPage,
    StudentWebinarsPage,
    StudentNewsletterPage,
    StudentLiveCourseCalendarPage,
    StudentLiveScheduleModalPage,
    StudentContactSupportModalPage,
    StudentSendIdeasPage
} = require('../pages/student');

/**
 * Custom Playwright fixtures for Stormwind application
 * Authentication is handled via storageState in playwright.config.js
 */
const test = base.extend({
    // Login page fixture (for tests that need to test login itself)
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    // Legacy page aliases (for backwards compatibility)
    // Page is already authenticated via storageState from config
    adminPage: async ({ page }, use) => {
        await use(page);
    },

    studentPage: async ({ page }, use) => {
        await use(page);
    },

    // Admin page objects - page is already authenticated via storageState
    adminDashboard: async ({ page }, use) => {
        const dashboardPage = new AdminDashboardPage(page);
        await use(dashboardPage);
    },

    adminDueDates: async ({ page }, use) => {
        const dueDatesPage = new AdminDueDatesPage(page);
        await use(dueDatesPage);
    },

    adminSkillsAssessmentsData: async ({ page }, use) => {
        const skillsAssessmentsDataPage = new AdminSkillsAssessmentsDataPage(page);
        await use(skillsAssessmentsDataPage);
    },

    adminAddUsers: async ({ page }, use) => {
        const addUsersPage = new AdminAddUsersPage(page);
        await use(addUsersPage);
    },

    adminManageLearningPaths: async ({ page }, use) => {
        const manageLearningPathsPage = new AdminManageLearningPathsPage(page);
        await use(manageLearningPathsPage);
    },

    adminCreateLearningPath: async ({ page }, use) => {
        const createLearningPathPage = new AdminCreateLearningPathPage(page);
        await use(createLearningPathPage);
    },

    // Admin shared components
    adminNavigation: async ({ page }, use) => {
        const navigationPage = new AdminNavigationPage(page);
        await use(navigationPage);
    },

    // Admin footer (reuses StudentFooterPage since footer is identical)
    adminFooter: async ({ page }, use) => {
        const footerPage = new StudentFooterPage(page);
        await use(footerPage);
    },

    // Admin course details page (for managers)
    adminCourseDetails: async ({ page }, use) => {
        const courseDetailsPage = new AdminCourseDetailsPage(page);
        await use(courseDetailsPage);
    },

    // Admin assign course modal
    adminAssignCourseModal: async ({ page }, use) => {
        const assignCourseModal = new AdminAssignCourseModalPage(page);
        await use(assignCourseModal);
    },

    // Student shared components
    studentNavigation: async ({ page }, use) => {
        const navigationPage = new StudentNavigationPage(page);
        await use(navigationPage);
    },

    studentFooter: async ({ page }, use) => {
        const footerPage = new StudentFooterPage(page);
        await use(footerPage);
    },

    // Student page objects - page is already authenticated via storageState
    studentMyClassroom: async ({ page }, use) => {
        const myClassroomPage = new StudentMyClassroomPage(page);
        await use(myClassroomPage);
    },

    studentCourses: async ({ page }, use) => {
        const coursesPage = new StudentCoursesPage(page);
        await use(coursesPage);
    },

    studentCoursesList: async ({ page }, use) => {
        const coursesListPage = new StudentCoursesListPage(page);
        await use(coursesListPage);
    },

    studentCourseDetails: async ({ page }, use) => {
        const courseDetailsPage = new StudentCourseDetailsPage(page);
        await use(courseDetailsPage);
    },

    studentCourseDetailsSupplements: async ({ page }, use) => {
        const courseDetailsSupplementsPage = new StudentCourseDetailsSupplementsPage(page);
        await use(courseDetailsSupplementsPage);
    },

    studentCourseLessons: async ({ page }, use) => {
        const courseLessonsPage = new StudentCourseLessonsPage(page);
        await use(courseLessonsPage);
    },

    studentLearningPaths: async ({ page }, use) => {
        const learningPathsPage = new StudentLearningPathsPage(page);
        await use(learningPathsPage);
    },

    studentSkillsAssessments: async ({ page }, use) => {
        const skillsAssessmentsPage = new StudentSkillsAssessmentsPage(page);
        await use(skillsAssessmentsPage);
    },

    studentLeaderboard: async ({ page }, use) => {
        const leaderboardPage = new StudentLeaderboardPage(page);
        await use(leaderboardPage);
    },

    // Sidebar pages
    studentWebinars: async ({ page }, use) => {
        const webinarsPage = new StudentWebinarsPage(page);
        await use(webinarsPage);
    },

    studentNewsletter: async ({ page }, use) => {
        const newsletterPage = new StudentNewsletterPage(page);
        await use(newsletterPage);
    },

    studentLiveCourseCalendar: async ({ page }, use) => {
        const calendarPage = new StudentLiveCourseCalendarPage(page);
        await use(calendarPage);
    },

    studentLiveScheduleModal: async ({ page }, use) => {
        const liveScheduleModal = new StudentLiveScheduleModalPage(page);
        await use(liveScheduleModal);
    },

    studentContactSupportModal: async ({ page }, use) => {
        const contactSupportModal = new StudentContactSupportModalPage(page);
        await use(contactSupportModal);
    },

    studentSendIdeas: async ({ page }, use) => {
        const sendIdeasPage = new StudentSendIdeasPage(page);
        await use(sendIdeasPage);
    }
});

module.exports = { test, expect, users, URLS };
