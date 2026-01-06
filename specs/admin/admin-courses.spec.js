const { test, expect } = require('../../fixtures/fixtures');

test.describe('Admin - Courses Tests', () => {
    test.beforeEach(async ({ adminCourses }) => {
        await adminCourses.goto();
    });

    test('should display courses page correctly', async ({ adminCourses }) => {
        const isDisplayed = await adminCourses.isCoursesPageDisplayed();
        expect(isDisplayed).toBeTruthy();
    });

    test('should be on the correct courses URL', async ({ adminCourses }) => {
        const isCorrectURL = await adminCourses.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();
    });

    test('should display create course button', async ({ adminCourses }) => {
        await expect(adminCourses.createCourseButton).toBeVisible();
    });

    test('should allow searching for courses', async ({ adminCourses }) => {
        await adminCourses.searchCourse('Test Course');
        // Add assertions based on search results
    });

    test('should open create course modal when create button is clicked', async ({ adminCourses }) => {
        await adminCourses.clickCreateCourse();
        // Add assertions for modal display
    });

    test('should display courses table', async ({ adminCourses }) => {
        await expect(adminCourses.coursesTable).toBeVisible();
    });
});
