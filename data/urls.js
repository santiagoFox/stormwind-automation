const URLS = {
    // Authentication
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',

    // Admin routes
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        COURSES: '/admin/courses',
        DUE_DATES: '/admin/due-dates',
        ASSESSMENTS: '/admin/assessments',
        MANAGE_LIBRARY: '/admin/manage-library'
    },

    // Student routes
    STUDENT: {
        DASHBOARD: '/student/dashboard',
        MY_CLASSROOM: '/student/my-classroom',
        LEADERBOARD: '/student/leaderboard'
    }
};

module.exports = URLS;
