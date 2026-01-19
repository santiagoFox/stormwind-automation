const { test, expect } = require('../../fixtures/fixtures');

/**
 * Admin - Assign Course Modal Tests
 * Tests the Assign Course functionality for managers
 * Course: PL-300 Microsoft Power BI Data Analyst
 * URL: /microsoft-it/microsoft-power-platform/pl-300-microsoft-power-bi-data-analyst#no-back
 */
test.describe('Admin - Assign Course Modal', () => {

    test('should validate due date warning and license error messages', async ({ adminCourseDetails }) => {
        // 1. Navigate to PL-300 course
        await adminCourseDetails.gotoPL300Course();

        // 2. Validate we're on the correct page
        const isCorrectURL = await adminCourseDetails.isOnCorrectURL();
        expect(isCorrectURL).toBeTruthy();

        // 3. Validate navigation is visible
        await adminCourseDetails.expectNavigationVisible();

        // 4. Validate Assign Course button is visible (manager-specific)
        await adminCourseDetails.expectAssignCourseBtnVisible();

        // 5. Click Assign Course button to open modal
        await adminCourseDetails.clickAssignCourse();

        // Get reference to modal
        const modal = adminCourseDetails.assignCourseModal;

        // 6. Validate modal is visible
        await modal.expectModalVisible();

        // ========== TEST DUE DATE WARNING ==========

        // 7. Search for "santi"
        await modal.searchStudents('santi');

        // 8. Select "Santiago Manager"
        await modal.selectStudent('Santiago Manager');

        // 9. Set due date to today
        await modal.setStudentDueDateToToday('Santiago Manager');

        // 10. Validate warning message is visible
        await modal.expectWarningMessageVisible('Santiago Manager');

        // Verify warning message text contains expected student name
        const warningText = await modal.getWarningMessageText();
        expect(warningText).toContain('Santiago Manager');
        expect(warningText).toContain('already have a due date');

        // 11. Clear the due date field
        await modal.clearStudentDueDate('Santiago Manager');

        // Wait for warning to disappear
        await modal.page.waitForTimeout(500);

        // 12. Validate warning message is hidden
        await modal.expectWarningMessageHidden();

        // Double-check it's really not visible
        const isWarningVisible = await modal.isWarningMessageVisible();
        expect(isWarningVisible).toBeFalsy();

        // ========== TEST LICENSE ERROR ==========

        // 13. Deselect "Santiago Manager"
        await modal.deselectStudent('Santiago Manager');

        // 14. Search for user without license
        await modal.searchStudents('Santiago contact');

        // 15. Select the user without license (Santiago contact 1)
        await modal.selectStudent('Santiago contact 1');

        // 16. Click Assign Course button in modal
        await modal.clickAssignCourse();

        // Wait for error message to appear
        await modal.page.waitForTimeout(500);

        // 17. Validate error message is visible
        await modal.expectErrorMessageVisible();

        // Verify error message text contains expected content
        const errorText = await modal.getErrorMessageText();
        expect(errorText).toContain('cannot be assigned');
        expect(errorText).toContain('not included in the license');

        // 18. Validate footer links
        await adminCourseDetails.expectAllFooterLinksVisible();
    });

});
