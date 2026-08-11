const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Contact Support Submit Request', () => {
    test.beforeEach(async ({ studentMyClassroom }) => {
        await studentMyClassroom.navigateFromNav();
    });

    test('should submit a support ticket and confirm it was sent', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Open modal
        await studentContactSupportModal.openModal();

        // STEP 2: Fill Subject + Description and submit
        await studentContactSupportModal.fillTicket(
            'Automated test ticket',
            'this is an automated testing request'
        );
        await studentContactSupportModal.clickSubmit();

        // STEP 3: Verify the "Ticket sent" confirmation state
        await studentContactSupportModal.expectTicketSent();
        await expect(studentContactSupportModal.newTicketButton).toBeVisible();

        // STEP 4: Close modal and verify it's closed
        await studentContactSupportModal.closeModal();
        await studentContactSupportModal.expectModalClosed();
    });

    test('should reset the form when clicking "New ticket"', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Open modal and submit a ticket
        await studentContactSupportModal.openModal();
        await studentContactSupportModal.fillTicket(
            'Automated test ticket',
            'this is an automated testing request'
        );
        await studentContactSupportModal.clickSubmit();
        await studentContactSupportModal.expectTicketSent();

        // STEP 2: Start a new ticket
        await studentContactSupportModal.clickNewTicket();

        // STEP 3: Verify the form reset to a blank, submittable state
        await studentContactSupportModal.expectSubmitButtonVisible();
        await expect(studentContactSupportModal.subjectTextbox).toHaveValue('');
        await expect(studentContactSupportModal.descriptionTextbox).toHaveValue('');
    });
});
