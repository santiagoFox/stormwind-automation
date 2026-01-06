const { test, expect } = require('../../fixtures/fixtures');
const StudentLiveCourseCalendarPage = require('../../pages/student/student-live-course-calendar.page');

test.describe('Student - Live Course Calendar', () => {
    test('should open calendar in new tab from sidebar', async ({ studentMyClassroom, context }) => {
        // Navigate to My Classroom first
        await studentMyClassroom.navigateFromNav();

        // Click Live Course Calendar and get the new tab
        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            studentMyClassroom.navigation.sidebarLiveCourseCalendar.click()
        ]);

        await newPage.waitForLoadState('networkidle');

        // Verify URL contains 'calendar'
        expect(newPage.url()).toContain('calendar');

        await newPage.close();
    });

    test('should display Today button', async ({ studentMyClassroom, context }) => {
        await studentMyClassroom.navigateFromNav();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            studentMyClassroom.navigation.sidebarLiveCourseCalendar.click()
        ]);

        await newPage.waitForLoadState('networkidle');

        // Create page object for new tab
        const calendarPage = StudentLiveCourseCalendarPage.createForNewTab(newPage);

        // Verify Today button is visible
        await calendarPage.expectTodayButtonVisible();

        await newPage.close();
    });

    test('should display navigation bar', async ({ studentMyClassroom, context }) => {
        await studentMyClassroom.navigateFromNav();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            studentMyClassroom.navigation.sidebarLiveCourseCalendar.click()
        ]);

        await newPage.waitForLoadState('networkidle');

        // Create page object for new tab
        const calendarPage = StudentLiveCourseCalendarPage.createForNewTab(newPage);

        // Verify navigation is visible
        await calendarPage.expectNavigationVisible();

        await newPage.close();
    });

    test('should display footer', async ({ studentMyClassroom, context }) => {
        await studentMyClassroom.navigateFromNav();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            studentMyClassroom.navigation.sidebarLiveCourseCalendar.click()
        ]);

        await newPage.waitForLoadState('networkidle');

        // Create page object for new tab
        const calendarPage = StudentLiveCourseCalendarPage.createForNewTab(newPage);

        // Verify footer is visible
        await calendarPage.expectFooterVisible();

        await newPage.close();
    });

    test('should display calendar grid', async ({ studentMyClassroom, context }) => {
        await studentMyClassroom.navigateFromNav();

        const [newPage] = await Promise.all([
            context.waitForEvent('page'),
            studentMyClassroom.navigation.sidebarLiveCourseCalendar.click()
        ]);

        await newPage.waitForLoadState('networkidle');

        // Create page object for new tab
        const calendarPage = StudentLiveCourseCalendarPage.createForNewTab(newPage);

        // Verify calendar grid is visible
        await calendarPage.expectCalendarGridVisible();

        await newPage.close();
    });
});
