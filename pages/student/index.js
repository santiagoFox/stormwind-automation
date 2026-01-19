// Student Page Objects - Central Export
const StudentNavigationPage = require('./student-navigation.page');
const StudentFooterPage = require('./student-footer.page');
const StudentMyClassroomPage = require('./student-my-classroom.page');
const StudentCoursesPage = require('./student-courses.page');
const StudentCoursesListPage = require('./student-courses-list.page');
const StudentCourseDetailsPage = require('./student-course-details.page');
const StudentCourseDetailsSupplementsPage = require('./student-course-details-supplements.page');
const StudentCourseLessonsPage = require('./student-course-lessons.page');
const StudentLearningPathsPage = require('./student-learning-paths.page');
const StudentSkillsAssessmentsPage = require('./student-skills-assessments.page');
const StudentLeaderboardPage = require('./student-leaderboard.page');
// Sidebar pages
const StudentWebinarsPage = require('./student-webinars.page');
const StudentNewsletterPage = require('./student-newsletter.page');
const StudentLiveCourseCalendarPage = require('./student-live-course-calendar.page');
const StudentLiveScheduleModalPage = require('./student-live-schedule-modal.page');
const StudentContactSupportModalPage = require('./student-contact-support-modal.page');
const StudentSendIdeasPage = require('./student-send-ideas.page');

module.exports = {
    // Shared components
    StudentNavigationPage,
    StudentFooterPage,
    // Main tab pages
    StudentMyClassroomPage,
    StudentCoursesPage,
    StudentCoursesListPage,
    StudentCourseDetailsPage,
    StudentCourseDetailsSupplementsPage,
    StudentCourseLessonsPage,
    StudentLearningPathsPage,
    StudentSkillsAssessmentsPage,
    StudentLeaderboardPage,
    // Sidebar pages
    StudentWebinarsPage,
    StudentNewsletterPage,
    StudentLiveCourseCalendarPage,
    StudentLiveScheduleModalPage,
    StudentContactSupportModalPage,
    StudentSendIdeasPage
};
