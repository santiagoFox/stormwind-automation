const URLS = {
    // Authentication
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',

    // Admin routes
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        DUE_DATES: '/admin/due-dates',
    },

    // Student routes — My Classroom and Leaderboard use dynamic user-specific URLs,
    // navigate via nav links rather than direct URL
    STUDENT: {
        SKILLS_ASSESSMENTS: '/skillsassessment',
    }
};

module.exports = URLS;
