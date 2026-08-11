const { test, expect } = require('../../fixtures/fixtures');

test.describe('Student - Contact Support Modal', () => {
    test.beforeEach(async ({ studentMyClassroom }) => {
        // Navigate to My Classroom where sidebar is visible
        await studentMyClassroom.navigateFromNav();
    });

    test('should remain on same page when clicking Contact Support', async ({ studentMyClassroom, studentContactSupportModal }) => {
        const urlBefore = studentMyClassroom.page.url();

        // STEP 1: Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify we're still on the same page (URL unchanged)
        const urlAfter = studentMyClassroom.page.url();
        expect(urlAfter).toBe(urlBefore);
    });

    test('should open modal with title "Support ticket"', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify modal is visible
        await studentContactSupportModal.expectModalVisible();

        // Verify modal title text
        await studentContactSupportModal.expectModalTitleVisible();
        await expect(studentContactSupportModal.modalTitle).toHaveText('Support ticket');
    });

    test('should display subtitle "How can we help, ...?"', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify modal opened
        await studentContactSupportModal.expectModalVisible();

        // Verify personalized subtitle (e.g. "How can we help, Santiago?")
        await studentContactSupportModal.expectModalSubtitleVisible();
        await expect(studentContactSupportModal.modalSubtitle).toContainText('How can we help');

        // Verify the intro copy is present
        await expect(studentContactSupportModal.modalIntro).toContainText('not a live chat');
    });

    test('should display Subject and Description fields with correct placeholders', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();
        await studentContactSupportModal.expectModalVisible();

        // Subject field
        await studentContactSupportModal.expectSubjectVisible();
        await expect(studentContactSupportModal.subjectTextbox).toHaveAttribute('placeholder', 'Brief summary of your issue');
        await expect(studentContactSupportModal.subjectTextbox).toHaveAttribute('maxlength', '120');

        // Description field
        await studentContactSupportModal.expectDescriptionVisible();
        await expect(studentContactSupportModal.descriptionTextbox).toHaveAttribute('placeholder', /What happened/);
        await expect(studentContactSupportModal.descriptionTextbox).toHaveAttribute('maxlength', '1000');
    });

    test('should display the "Submit ticket" button', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();
        await studentContactSupportModal.expectModalVisible();

        // Verify submit button
        await studentContactSupportModal.expectSubmitButtonVisible();
    });

    test('should allow entering text in the Subject and Description fields', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();
        await studentContactSupportModal.expectModalVisible();

        // STEP 2: Fill in the fields
        await studentContactSupportModal.fillSubject('automated subject');
        await studentContactSupportModal.fillMessage('automated description text');

        // Verify text was entered
        await expect(studentContactSupportModal.subjectTextbox).toHaveValue('automated subject');
        await expect(studentContactSupportModal.descriptionTextbox).toHaveValue('automated description text');
    });

    test('should verify all modal elements are displayed', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Click Contact Support
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify all modal elements
        await studentContactSupportModal.verifyModalOpened();
    });

    test('should close modal when clicking close button', async ({ studentMyClassroom, studentContactSupportModal }) => {
        // STEP 1: Click Contact Support to open modal
        await studentMyClassroom.navigation.clickContactSupport();

        // Verify modal is open
        await studentContactSupportModal.expectModalVisible();

        // STEP 2: Close the modal
        await studentContactSupportModal.closeModal();

        // Verify modal is closed
        await studentContactSupportModal.expectModalClosed();
    });
});
