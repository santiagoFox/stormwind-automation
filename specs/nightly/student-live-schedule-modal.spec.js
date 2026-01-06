const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - My Live Schedule Modal', () => {
    test.beforeEach(async ({ studentMyClassroom }) => {
        // Navigate to My Classroom where sidebar is visible
        await studentMyClassroom.navigateFromNav();
    });

    test('should remain on same page when clicking My Live Schedule', async ({ studentMyClassroom, studentLiveScheduleModal }) => {
        const urlBefore = studentMyClassroom.page.url();

        // Click My Live Schedule
        await studentMyClassroom.navigation.clickMyLiveSchedule();

        // Verify we're still on the same page (URL unchanged)
        const urlAfter = studentMyClassroom.page.url();
        expect(urlAfter).toBe(urlBefore);
    });

    test('should open modal with title "Live Schedule"', async ({ studentMyClassroom, studentLiveScheduleModal }) => {
        // Click My Live Schedule
        await studentMyClassroom.navigation.clickMyLiveSchedule();

        // Verify modal is visible
        await studentLiveScheduleModal.expectModalVisible();

        // Verify modal title
        await studentLiveScheduleModal.expectModalTitleVisible();
    });

    test('should display modal content', async ({ studentMyClassroom, studentLiveScheduleModal }) => {
        // Click My Live Schedule
        await studentMyClassroom.navigation.clickMyLiveSchedule();

        // Verify modal opened
        await studentLiveScheduleModal.verifyModalOpened();
    });

    test('should close modal when clicking close button', async ({ studentMyClassroom, studentLiveScheduleModal }) => {
        // Click My Live Schedule to open modal
        await studentMyClassroom.navigation.clickMyLiveSchedule();

        // Verify modal is open
        await studentLiveScheduleModal.expectModalVisible();

        // Close the modal
        await studentLiveScheduleModal.closeModal();

        // Verify modal is closed
        await studentLiveScheduleModal.expectModalClosed();
    });
});
