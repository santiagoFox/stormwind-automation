const URLS = {
    // Authentication
    LOGIN: '/user/login',
    LOGOUT: '/user/logout',

    // Admin routes - Note: Actual admin URLs use /team/{teamId}/... pattern
    // These are accessed via navigation, not direct URL
    ADMIN: {
        // Dashboard is accessed via hardcoded URL in page object
        // Other admin pages are accessed via navigation links
    },

    // Student routes - Note: Actual student URLs vary
    // These are accessed via navigation, not direct URL
    STUDENT: {
        // Student pages are accessed via navigation links
    }
};

module.exports = URLS;
