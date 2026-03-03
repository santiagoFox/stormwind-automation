const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Contact Support Submit Request', () => {
    test.beforeEach(async ({ studentMyClassroom }) => {
        await studentMyClassroom.navigateFromNav();
    });

    test('should submit a support request and confirm success message', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // Open modal
        await studentMyClassroom.navigation.clickContactSupport();
        await studentContactSupportModal.expectModalVisible();

        // Type message and submit
        await studentContactSupportModal.fillMessage('this is an automated testing request');
        await studentContactSupportModal.clickRequest();

        // Verify success message is displayed
        await studentContactSupportModal.expectSuccessMessageVisible();

        // Close modal and verify it's closed
        await studentContactSupportModal.closeModal();
        await studentContactSupportModal.expectModalClosed();
    });
});
