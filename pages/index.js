// Page Object Model - Central Export
const BasePage = require('./base.page');
const LoginPage = require('./login.page');

// Admin Pages
const AdminDashboardPage = require('./admin-dashboard.page');
const AdminCoursesPage = require('./admin-courses.page');
const AdminDueDatesPage = require('./admin-due-dates.page');
const AdminAssessmentsPage = require('./admin-assessments.page');
const AdminManageLibraryPage = require('./admin-manage-library.page');

// Student Pages (from student directory)
const {
    StudentNavigationPage,
    StudentFooterPage,
    StudentMyClassroomPage,
    StudentCoursesPage,
    StudentLearningPathsPage,
    StudentSkillsAssessmentsPage,
    StudentLeaderboardPage
} = require('./student');

module.exports = {
    BasePage,
    LoginPage,
    // Admin
    AdminDashboardPage,
    AdminCoursesPage,
    AdminDueDatesPage,
    AdminAssessmentsPage,
    AdminManageLibraryPage,
    // Student - Shared Components
    StudentNavigationPage,
    StudentFooterPage,
    // Student - Tab Pages
    StudentMyClassroomPage,
    StudentCoursesPage,
    StudentLearningPathsPage,
    StudentSkillsAssessmentsPage,
    StudentLeaderboardPage
};
