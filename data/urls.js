const URLS = {
    // Authentication
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',

    // Admin routes
    ADMIN: {
        DASHBOARD: '/admin/dashboard',
        DUE_DATES: '/admin/due-dates',
    },

    // Student routes
    STUDENT: {
        DASHBOARD: '/student/dashboard',
        MY_CLASSROOM: '/student/my-classroom',
        LEADERBOARD: '/student/leaderboard'
    }
};

module.exports = URLS;
