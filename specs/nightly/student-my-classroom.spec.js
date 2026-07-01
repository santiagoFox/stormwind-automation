const { test, expect } = require('../../fixtures/fixtures');

/**
 * Student - My Classroom Page Tests
 * All validations run in a single test to avoid multiple logins
 */
test.describe('Student - My Classroom Page', () => {

    test('should validate My Classroom page elements and footer', async ({ studentMyClassroom }) => {
        // Navigate to My Classroom via top navigation
        await studentMyClassroom.navigateFromNav();

        // 1. Validate URL
        const isCorrectURL = await studentMyClassroom.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();

        // 2. Verify welcome message
        await studentMyClassroom.expectWelcomeMessageVisible();

        // 3. Verify the 3 subtabs within My Classroom page
        await studentMyClassroom.expectTabsVisible();

        // 4. Verify featured course card has RESUME and SEE COURSE DETAILS buttons
        await studentMyClassroom.expectFeaturedCourseCardVisible();

        // 5. Verify filter pills (All / In progress / Completed) are visible
        await studentMyClassroom.expectFilterPillsVisible();

        // 6. Verify clicking "In progress" filter keeps user on the page with course cards
        await studentMyClassroom.clickInProgressFilter();
        expect(await studentMyClassroom.isOnCorrectURL()).toBeTruthy();

        // 7. Verify overdue badge renders on overdue courses. The badge only
        // exists when the account currently has an overdue course, so guard on
        // the count to avoid a data-dependent false failure when none are overdue.
        await studentMyClassroom.allFilterPill.click();
        if ((await studentMyClassroom.overdueBadgeCount()) > 0) {
            await studentMyClassroom.expectOverdueBadgeVisible();
        } else {
            test.info().annotations.push({
                type: 'notice',
                description: 'No overdue courses on the account — overdue badge not validated this run',
            });
        }

        // 8. Verify sidebar links
        await studentMyClassroom.expectSidebarLinksVisible();

        // 9. Verify footer with all links
        await studentMyClassroom.expectAllFooterLinksVisible();

        // 10. Switch to Learning Paths tab and verify URL stays on My Classroom
        await studentMyClassroom.clickLearningPathsTab();
        expect(await studentMyClassroom.isOnCorrectURL()).toBeTruthy();

        // 11. Switch to Skills Assessment tab
        await studentMyClassroom.clickSkillsAssessmentTab();
        expect(await studentMyClassroom.isOnCorrectURL()).toBeTruthy();

        // 12. Switch back to Courses tab
        await studentMyClassroom.clickCoursesTab();
        expect(await studentMyClassroom.isOnCorrectURL()).toBeTruthy();

        // 13. Click Completed filter and verify page stays on My Classroom
        await studentMyClassroom.clickCompletedFilter();
        expect(await studentMyClassroom.isOnCorrectURL()).toBeTruthy();
        await studentMyClassroom.allFilterPill.click();
    });
});
