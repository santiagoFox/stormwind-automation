const base = require('@playwright/test').test;
const { expect } = require('@playwright/test');
const users = require('../data/users');
const URLS = require('../data/urls');

// Page Objects - Shared
const LoginPage = require('../pages/login.page');

// Page Objects - Admin (from admin directory)
const {
    AdminDashboardPage,
    AdminCoursesPage,
    AdminDueDatesPage,
    AdminAssessmentsPage,
    AdminManageLibraryPage
} = require('../pages/admin');

// Page Objects - Student (from student directory)
const {
    StudentNavigationPage,
    StudentFooterPage,
    StudentMyClassroomPage,
    StudentCoursesPage,
    StudentCoursesListPage,
    StudentCourseDetailsPage,
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
 */
const test = base.extend({
    // Login page fixture
    loginPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await use(loginPage);
    },

    // Authenticated admin page
    adminPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto(URLS.LOGIN);
        await loginPage.login(users.admin.email, users.admin.password);
        await page.waitForLoadState('load');
        await use(page);
    },

    // Authenticated student page
    studentPage: async ({ page }, use) => {
        const loginPage = new LoginPage(page);
        await page.goto(URLS.LOGIN);
        await loginPage.login(users.student.email, users.student.password);
        await page.waitForLoadState('load');
        await use(page);
    },

    // Admin page objects - auto-initialized after login
    adminDashboard: async ({ adminPage }, use) => {
        const dashboardPage = new AdminDashboardPage(adminPage);
        await use(dashboardPage);
    },

    adminCourses: async ({ adminPage }, use) => {
        const coursesPage = new AdminCoursesPage(adminPage);
        await use(coursesPage);
    },

    adminDueDates: async ({ adminPage }, use) => {
        const dueDatesPage = new AdminDueDatesPage(adminPage);
        await use(dueDatesPage);
    },

    adminAssessments: async ({ adminPage }, use) => {
        const assessmentsPage = new AdminAssessmentsPage(adminPage);
        await use(assessmentsPage);
    },

    adminManageLibrary: async ({ adminPage }, use) => {
        const manageLibraryPage = new AdminManageLibraryPage(adminPage);
        await use(manageLibraryPage);
    },

    // Student shared components
    studentNavigation: async ({ studentPage }, use) => {
        const navigationPage = new StudentNavigationPage(studentPage);
        await use(navigationPage);
    },

    studentFooter: async ({ studentPage }, use) => {
        const footerPage = new StudentFooterPage(studentPage);
        await use(footerPage);
    },

    // Student page objects - auto-initialized after login
    studentMyClassroom: async ({ studentPage }, use) => {
        const myClassroomPage = new StudentMyClassroomPage(studentPage);
        await use(myClassroomPage);
    },

    studentCourses: async ({ studentPage }, use) => {
        const coursesPage = new StudentCoursesPage(studentPage);
        await use(coursesPage);
    },

    studentCoursesList: async ({ studentPage }, use) => {
        const coursesListPage = new StudentCoursesListPage(studentPage);
        await use(coursesListPage);
    },

    studentCourseDetails: async ({ studentPage }, use) => {
        const courseDetailsPage = new StudentCourseDetailsPage(studentPage);
        await use(courseDetailsPage);
    },

    studentLearningPaths: async ({ studentPage }, use) => {
        const learningPathsPage = new StudentLearningPathsPage(studentPage);
        await use(learningPathsPage);
    },

    studentSkillsAssessments: async ({ studentPage }, use) => {
        const skillsAssessmentsPage = new StudentSkillsAssessmentsPage(studentPage);
        await use(skillsAssessmentsPage);
    },

    studentLeaderboard: async ({ studentPage }, use) => {
        const leaderboardPage = new StudentLeaderboardPage(studentPage);
        await use(leaderboardPage);
    },

    // Sidebar pages
    studentWebinars: async ({ studentPage }, use) => {
        const webinarsPage = new StudentWebinarsPage(studentPage);
        await use(webinarsPage);
    },

    studentNewsletter: async ({ studentPage }, use) => {
        const newsletterPage = new StudentNewsletterPage(studentPage);
        await use(newsletterPage);
    },

    studentLiveCourseCalendar: async ({ studentPage }, use) => {
        const calendarPage = new StudentLiveCourseCalendarPage(studentPage);
        await use(calendarPage);
    },

    studentLiveScheduleModal: async ({ studentPage }, use) => {
        const liveScheduleModal = new StudentLiveScheduleModalPage(studentPage);
        await use(liveScheduleModal);
    },

    studentContactSupportModal: async ({ studentPage }, use) => {
        const contactSupportModal = new StudentContactSupportModalPage(studentPage);
        await use(contactSupportModal);
    },

    studentSendIdeas: async ({ studentPage }, use) => {
        const sendIdeasPage = new StudentSendIdeasPage(studentPage);
        await use(sendIdeasPage);
    }
});

module.exports = { test, expect, users, URLS };
