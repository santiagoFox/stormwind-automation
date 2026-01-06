const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Contact Support Modal', () => {
    test.beforeEach(async ({ studentMyClassroom }) => {
        // Navigate to My Classroom where sidebar is visible
        await studentMyClassroom.navigateFromNav();
    });

    test('should remain on same page when clicking Contact Support', async ({ studentMyClassroom, studentContactSupportModal }) => {
        const urlBefore = studentMyClassroom.page.url();

        // Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify we're still on the same page (URL unchanged)
        const urlAfter = studentMyClassroom.page.url();
        expect(urlAfter).toBe(urlBefore);
    });

    test('should open modal with title "Contact Support"', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify modal is visible
        await studentContactSupportModal.expectModalVisible();

        // Verify modal title
        await studentContactSupportModal.expectModalTitleVisible();
    });

    test('should display subtitle "Hi, how can we help you?"', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify modal opened
        await studentContactSupportModal.expectModalVisible();

        // Verify subtitle
        await studentContactSupportModal.expectModalSubtitleVisible();
    });

    test('should display textbox and Request button', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify form elements
        await studentContactSupportModal.expectTextboxVisible();
        await studentContactSupportModal.expectRequestButtonVisible();
    });

    test('should allow entering text in the message textbox', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify modal opened
        await studentContactSupportModal.expectModalVisible();

        // Fill in the textbox
        await studentContactSupportModal.fillMessage('testing text');

        // Verify text was entered
        await expect(studentContactSupportModal.messageTextbox).toHaveValue('testing text');
    });

    test('should verify all modal elements are displayed', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify all modal elements
        await studentContactSupportModal.verifyModalOpened();
    });

    test('should close modal when clicking close button', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // Click Contact Support to open modal
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify modal is open
        await studentContactSupportModal.expectModalVisible();

        // Close the modal
        await studentContactSupportModal.closeModal();

        // Verify modal is closed
        await studentContactSupportModal.expectModalClosed();
    });
});
